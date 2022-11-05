import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const StoryCreateInputType = inputObjectType({
  name: 'StoryCreateInputType',
  description: 'Input arguments used in the createStory mutation',
  definition(t) {
    t.nonNull.id('orgID');
    t.nonNull.string('image');
    t.string('linkTo');
  },
});

export const createStory = mutationField('createStory', {
  type: 'Story',
  description: 'Creates a new story record',
  authorize: (_parent, args, ctx) =>
    checkGqlPermissions(
      ctx,
      [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.SUPER_EDITOR,
        PERMISSIONS.ORG_ADMIN,
        PERMISSIONS.ORG_EDITOR,
      ],
      args.orgID,
    ),
  args: {
    orgID: nonNull(idArg()),
    story: nonNull('StoryCreateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.story.create({
      data: args.story,
    });
  },
});

export const deleteStory = mutationField('deleteStory', {
  type: 'Boolean',
  description: 'Deletes and existing story record',
  authorize: (_parent, args, ctx) =>
    checkGqlPermissions(
      ctx,
      [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.SUPER_EDITOR,
        PERMISSIONS.ORG_ADMIN,
        PERMISSIONS.ORG_EDITOR,
      ],
      args.orgID,
    ),
  args: {
    id: nonNull(idArg()),
    orgID: nonNull(idArg()),
  },
  async resolve(_parent, args, { prisma }) {
    try {
      await prisma.story.delete({
        where: {
          id: args.id,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  },
});
