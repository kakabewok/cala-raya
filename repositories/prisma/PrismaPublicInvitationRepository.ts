import prisma from "@/lib/prisma";
import InvitationData from "@/types/invitation-data";
import {
  IPublicInvitationRepository,
  InvitationMetadata,
} from "../interfaces/IPublicInvitationRepository";

/**
 * Prisma implementation of IPublicInvitationRepository
 * Used for guest-facing public invitation pages
 */

// Full include for public invitation display
const PUBLIC_INVITATION_INCLUDE = {
  themes: true,
  music: true,
  images: true,
  rundowns: true,
  gift_infos: true,
  stories: true,
  guests: true,
  rsvps: true,
  videos: true,
} as const;

export class PrismaPublicInvitationRepository
  implements IPublicInvitationRepository {
  /**
   * Find invitation by slug and ID for public access
   */
  async findBySlugAndId(
    slug: string,
    invitationId: number
  ): Promise<InvitationData | null> {
    try {
      const invitation = await prisma.invitations.findFirst({
        where: {
          slug,
          id: invitationId,
          is_active: true,
        },
        include: PUBLIC_INVITATION_INCLUDE,
      });

      return invitation as unknown as InvitationData | null;
    } catch (error: any) {
      throw new Error(
        `Failed to fetch public invitation: ${error.message}`
      );
    }
  }

  /**
   * Find invitation by slug only for public access
   */
  async findBySlug(slug: string): Promise<InvitationData | null> {
    try {
      const invitation = await prisma.invitations.findFirst({
        where: {
          slug,
          is_active: true,
        },
        include: PUBLIC_INVITATION_INCLUDE,
      });

      return invitation as unknown as InvitationData | null;
    } catch (error: any) {
      throw new Error(
        `Failed to fetch public invitation by slug: ${error.message}`
      );
    }
  }

  /**
   * Find invitation metadata for SEO/Open Graph tags
   * Only fetches the minimal data needed for metadata
   */
  async findMetadataBySlug(slug: string): Promise<InvitationMetadata | null> {
    try {
      const invitation = await prisma.invitations.findFirst({
        where: {
          slug,
          is_active: true,
        },
        select: {
          host_one_nickname: true,
          host_two_nickname: true,
          event_title: true,
          slug: true,
          event_date: true,
          rundowns: {
            select: {
              id: true,
              title: true,
              date: true,
              location: true,
            },
          },
          images: {
            select: {
              id: true,
              url: true,
              type: true,
            },
          },
        },
      });

      if (!invitation) return null;

      return {
        host_one_nickname: invitation.host_one_nickname ?? "",
        host_two_nickname: invitation.host_two_nickname ?? "",
        event_title: invitation.event_title ?? "",
        slug: invitation.slug ?? "",
        event_date: invitation.event_date
          ? invitation.event_date.toISOString()
          : "",
        rundowns: invitation.rundowns.map((rundown) => ({
          id: rundown.id,
          title: rundown.title ?? "",
          date: rundown.date
            ? rundown.date.toISOString()
            : "",
          location: rundown.location ?? "",
        })),
        images: invitation.images.map((img) => ({
          id: img.id,
          url: img.url ?? "",
          type: img.type ?? "",
        })),
      };
    } catch (error: any) {
      throw new Error(
        `Failed to fetch invitation metadata: ${error.message}`
      );
    }
  }
}
