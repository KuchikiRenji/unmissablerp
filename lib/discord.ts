/**
 * Discord API helper functions for role management
 * 
 * Required Discord Bot Permissions:
 * - MANAGE_ROLES: To assign/remove roles
 * - VIEW_CHANNEL: To access guild information
 * - CONNECT: To interact with guild members
 */

const DISCORD_API_BASE = 'https://discord.com/api/v10';

export interface DiscordRoleResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Assigns a Discord role to a user
 * @param userId Discord user ID (snowflake)
 * @param roleId Discord role ID (snowflake)
 * @returns Promise with success status and message
 */
export async function assignDiscordRole(
  userId: string,
  roleId: string
): Promise<DiscordRoleResponse> {
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!botToken || !guildId) {
    return {
      success: false,
      message: 'Discord integration not configured',
      error: 'Missing DISCORD_BOT_TOKEN or DISCORD_GUILD_ID'
    };
  }

  if (!roleId) {
    return {
      success: false,
      message: 'Role ID not configured for this tier',
      error: 'Missing role ID'
    };
  }

  try {
    const url = `${DISCORD_API_BASE}/guilds/${guildId}/members/${userId}/roles/${roleId}`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 204) {
      return {
        success: true,
        message: 'Role assigned successfully'
      };
    }

    if (response.status === 404) {
      return {
        success: false,
        message: 'User or role not found',
        error: '404 Not Found'
      };
    }

    const errorText = await response.text();
    return {
      success: false,
      message: 'Failed to assign role',
      error: `Discord API error: ${response.status} - ${errorText}`
    };
  } catch (error) {
    return {
      success: false,
      message: 'Network error while assigning role',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Removes a Discord role from a user
 * @param userId Discord user ID (snowflake)
 * @param roleId Discord role ID (snowflake)
 * @returns Promise with success status and message
 */
export async function removeDiscordRole(
  userId: string,
  roleId: string
): Promise<DiscordRoleResponse> {
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!botToken || !guildId) {
    return {
      success: false,
      message: 'Discord integration not configured',
      error: 'Missing DISCORD_BOT_TOKEN or DISCORD_GUILD_ID'
    };
  }

  if (!roleId) {
    return {
      success: false,
      message: 'Role ID not configured',
      error: 'Missing role ID'
    };
  }

  try {
    const url = `${DISCORD_API_BASE}/guilds/${guildId}/members/${userId}/roles/${roleId}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 204) {
      return {
        success: true,
        message: 'Role removed successfully'
      };
    }

    if (response.status === 404) {
      // User or role not found - consider this a success (role already removed)
      return {
        success: true,
        message: 'Role not found (already removed)'
      };
    }

    const errorText = await response.text();
    return {
      success: false,
      message: 'Failed to remove role',
      error: `Discord API error: ${response.status} - ${errorText}`
    };
  } catch (error) {
    return {
      success: false,
      message: 'Network error while removing role',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Checks if Discord integration is properly configured
 */
export function isDiscordConfigured(): boolean {
  return !!(
    process.env.DISCORD_BOT_TOKEN &&
    process.env.DISCORD_GUILD_ID &&
    process.env.DISCORD_BOT_TOKEN.length > 0 &&
    process.env.DISCORD_GUILD_ID.length > 0
  );
}

