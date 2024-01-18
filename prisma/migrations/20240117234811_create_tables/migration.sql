-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "avatar" TEXT,
    "password" VARCHAR NOT NULL,
    "enable" BOOLEAN NOT NULL DEFAULT true,
    "token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "followers" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_user_follower" TEXT NOT NULL,

    CONSTRAINT "followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "followings" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_user_following" TEXT NOT NULL,

    CONSTRAINT "followings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweets_base" (
    "id" TEXT NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "idUser" TEXT NOT NULL,

    CONSTRAINT "tweets_base_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "replies" (
    "id" TEXT NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "id_user_replie" TEXT NOT NULL,
    "id_tweet_base" TEXT NOT NULL,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retweets" (
    "id" TEXT NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "id_user_retweet" TEXT NOT NULL,
    "id_tweet_base" TEXT NOT NULL,

    CONSTRAINT "retweets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "like" VARCHAR(10) NOT NULL,
    "id_tweet" TEXT NOT NULL,
    "id_retweet" TEXT NOT NULL,
    "id_replie" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_token_key" ON "users"("token");

-- AddForeignKey
ALTER TABLE "followers" ADD CONSTRAINT "followers_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followings" ADD CONSTRAINT "followings_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tweets_base" ADD CONSTRAINT "tweets_base_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_id_user_replie_fkey" FOREIGN KEY ("id_user_replie") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_id_tweet_base_fkey" FOREIGN KEY ("id_tweet_base") REFERENCES "tweets_base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweets" ADD CONSTRAINT "retweets_id_user_retweet_fkey" FOREIGN KEY ("id_user_retweet") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retweets" ADD CONSTRAINT "retweets_id_tweet_base_fkey" FOREIGN KEY ("id_tweet_base") REFERENCES "tweets_base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_id_tweet_fkey" FOREIGN KEY ("id_tweet") REFERENCES "tweets_base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_id_retweet_fkey" FOREIGN KEY ("id_retweet") REFERENCES "retweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_id_replie_fkey" FOREIGN KEY ("id_replie") REFERENCES "replies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
