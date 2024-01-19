-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_id_replie_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_id_retweet_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_id_tweet_fkey";

-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "id_tweet" DROP NOT NULL,
ALTER COLUMN "id_retweet" DROP NOT NULL,
ALTER COLUMN "id_replie" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_id_tweet_fkey" FOREIGN KEY ("id_tweet") REFERENCES "tweets_base"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_id_retweet_fkey" FOREIGN KEY ("id_retweet") REFERENCES "retweets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_id_replie_fkey" FOREIGN KEY ("id_replie") REFERENCES "replies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
