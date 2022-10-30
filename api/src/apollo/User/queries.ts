import { idArg, inputObjectType, list, nonNull, queryField, stringArg } from 'nexus';

export const getUser = queryField('getUser', {
  type: 'User',
  description: 'Returns a user whose id or email is passed',
  args: {
    id: idArg(),
    uid: idArg(),
    email: stringArg(),
  },
  resolve(_parent, args, { prisma }) {
    if (args.id) {
      return prisma.user.findUnique({
        where: { id: args.id },
      });
    }

    if (args.email) {
      return prisma.user.findUnique({
        where: { email: args.email },
      });
    }

    if (args.uid) {
      return prisma.user.findUnique({
        where: { uid: args.uid },
      });
    }

    // TODO: setup custom error handler
    throw new Error('No Parameters sent, please send parameters');
  },
});

export const GetUsersInputType = inputObjectType({
  name: 'GetUsersInputType',
  description: 'Input arguments used in getUsers query',
  definition(t) {
    t.string('state');
    t.string('city');
    t.string('college');
    t.string('stream');
    t.string('referredBy');
    t.list.nonNull.string('festID');
    t.boolean('isNitrStudent');
  },
});

export const getUsers = queryField('getUsers', {
  type: list('User'),
  description: 'Returns a list of all the users depending upon the arguments',
  args: {
    params: nonNull('GetUsersInputType'),
  },
  resolve(_parent, args, { prisma }) {
    if (args.params.isNitrStudent) {
      return prisma.user.findMany({
        where: {
          rollNumber: {
            not: null,
          },
        },
      });
    }

    if (args.params.festID) {
      return prisma.user.findMany({
        where: {
          festID: {
            hasEvery: args.params.festID,
          },
        },
      });
    }

    if (args) {
      return prisma.user.findMany({
        where: {
          ...args.params,
          festID: undefined,
        },
      });
    }

    return prisma.user.findMany();
  },
});
