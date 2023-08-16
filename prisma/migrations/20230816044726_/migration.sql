-- CreateTable
CREATE TABLE "guilds" (
    "guild_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("guild_id")
);
