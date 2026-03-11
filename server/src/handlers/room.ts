import type { FastifyRequest, FastifyReply } from 'fastify';
import { prisma, ApiError, generateRoomCode, generateQRCodeUrl } from '../utils/helpers';
import { RoomStatus, RoomMemberRole } from '@prisma/client';

export async function handleCreateRoom(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    if (!request.userId) {
      throw new ApiError(401, 'Unauthorized');
    }

    // Check if user has reached daily limit (for free users)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysRooms = await prisma.room.count({
      where: {
        members: {
          some: {
            userId: request.userId,
            role: RoomMemberRole.LEAD,
          },
        },
        createdAt: {
          gte: today,
        },
      },
    });

    if (todaysRooms >= 1) {
      throw new ApiError(429, 'You can only create one room per day. Consider upgrading to unlock unlimited rooms.');
    }

    // Generate room code
    let code: string;
    let codeExists = true;
    while (codeExists) {
      code = generateRoomCode();
      const existing = await prisma.room.findUnique({ where: { code } });
      codeExists = !!existing;
    }

    const qrData = `twynd://room/${code}`;
    const qrCodeUrl = generateQRCodeUrl(qrData);

    const room = await prisma.room.create({
      data: {
        code,
        qrCodeUrl,
        status: RoomStatus.WAITING_FOR_PARTNER,
        members: {
          create: {
            userId: request.userId,
            role: RoomMemberRole.LEAD,
          },
        },
      },
    });

    // Update user as room lead
    await prisma.user.update({
      where: { id: request.userId },
      data: {
        currentRoomId: room.id,
        isRoomLead: true,
      },
    });

    return reply.send({
      id: room.id,
      code: room.code,
      qrCodeUrl: room.qrCodeUrl,
      status: room.status,
      createdAt: room.createdAt,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return reply.code(error.statusCode).send({ error: error.message });
    }
    console.error('Create room error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}

export async function handleGetRoom(
  request: FastifyRequest<{
    Params: { roomId: string };
  }>,
  reply: FastifyReply
) {
  try {
    if (!request.userId) {
      throw new ApiError(401, 'Unauthorized');
    }

    const { roomId } = request.params;

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                nickname: true,
                avatar: true,
                statusEmoji: true,
                statusMessage: true,
              },
            },
          },
        },
      },
    });

    if (!room) {
      throw new ApiError(404, 'Room not found');
    }

    return reply.send(room);
  } catch (error) {
    if (error instanceof ApiError) {
      return reply.code(error.statusCode).send({ error: error.message });
    }
    console.error('Get room error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}

export async function handleJoinRoom(
  request: FastifyRequest<{
    Body: { roomCode: string };
  }>,
  reply: FastifyReply
) {
  try {
    if (!request.userId) {
      throw new ApiError(401, 'Unauthorized');
    }

    const { roomCode } = request.body;

    const room = await prisma.room.findUnique({ where: { code: roomCode } });

    if (!room) {
      throw new ApiError(404, 'Room not found');
    }

    if (room.status !== RoomStatus.WAITING_FOR_PARTNER) {
      throw new ApiError(400, 'Room is not available for joining');
    }

    // Check if user is already in another room
    const existingMembership = await prisma.roomMember.findFirst({
      where: { userId: request.userId },
    });

    if (existingMembership) {
      throw new ApiError(400, 'You are already in another room');
    }

    // Add user to room as follower
    const member = await prisma.roomMember.create({
      data: {
        roomId: room.id,
        userId: request.userId,
        role: RoomMemberRole.FOLLOWER,
      },
    });

    // Update room status
    await prisma.room.update({
      where: { id: room.id },
      data: { status: RoomStatus.ACTIVE },
    });

    // Update user
    await prisma.user.update({
      where: { id: request.userId },
      data: { currentRoomId: room.id },
    });

    return reply.send({
      id: room.id,
      code: room.code,
      status: RoomStatus.ACTIVE,
      message: 'Successfully joined room',
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return reply.code(error.statusCode).send({ error: error.message });
    }
    console.error('Join room error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}

export async function handleGetQRCode(
  request: FastifyRequest<{
    Params: { roomId: string };
  }>,
  reply: FastifyReply
) {
  try {
    if (!request.userId) {
      throw new ApiError(401, 'Unauthorized');
    }

    const { roomId } = request.params;

    const room = await prisma.room.findUnique({ where: { id: roomId } });

    if (!room) {
      throw new ApiError(404, 'Room not found');
    }

    return reply.send({
      qrCodeUrl: room.qrCodeUrl,
      roomCode: room.code,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return reply.code(error.statusCode).send({ error: error.message });
    }
    console.error('Get QR code error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}

export async function handleAcceptConnection(
  request: FastifyRequest<{
    Body: { leadsUserId: string; role: string };
  }>,
  reply: FastifyReply
) {
  try {
    if (!request.userId) {
      throw new ApiError(401, 'Unauthorized');
    }

    const { leadsUserId, role } = request.body;

    // Create connection between users
    if (role === 'lead') {
      await prisma.user.update({
        where: { id: request.userId },
        data: { connectionPartnerId: leadsUserId, isRoomLead: true },
      });
    } else {
      await prisma.user.update({
        where: { id: request.userId },
        data: { connectionPartnerId: leadsUserId, isRoomLead: false },
      });
    }

    return reply.send({
      success: true,
      message: 'Connection accepted',
      role,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return reply.code(error.statusCode).send({ error: error.message });
    }
    console.error('Accept connection error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
