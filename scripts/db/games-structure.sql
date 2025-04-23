/*
 Navicat Premium Dump SQL

 Source Server         : Neon-TekKid-game
 Source Server Type    : PostgreSQL
 Source Server Version : 170004 (170004)
 Source Host           : ep-red-haze-a1e9c6al-pooler.ap-southeast-1.aws.neon.tech:5432
 Source Catalog        : neondb
 Source Schema         : tekkid-games

 Target Server Type    : PostgreSQL
 Target Server Version : 170004 (170004)
 File Encoding         : 65001

 Date: 23/04/2025 13:31:23
*/


-- ----------------------------
-- Table structure for games
-- ----------------------------
DROP TABLE IF EXISTS "tekkid-games"."games";
CREATE TABLE "tekkid-games"."games" (
  "catalog_ids" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "image" varchar(500) COLLATE "pg_catalog"."default" NOT NULL,
  "plays" int4 NOT NULL,
  "rating" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(15000) COLLATE "pg_catalog"."default" NOT NULL,
  "instructions" varchar(600) COLLATE "pg_catalog"."default" NOT NULL,
  "w" int4 NOT NULL DEFAULT 400,
  "h" int4 NOT NULL DEFAULT 600,
  "featured" int2 NOT NULL DEFAULT 0,
  "mobile" bool NOT NULL DEFAULT false,
  "tag_ids" text COLLATE "pg_catalog"."default",
  "video_url" varchar(100) COLLATE "pg_catalog"."default",
  "id" int4 NOT NULL,
  "slug" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "game_url" varchar(500) COLLATE "pg_catalog"."default" NOT NULL,
  "developer" varchar(250) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'TekKid'
)
;
ALTER TABLE "tekkid-games"."games" OWNER TO "neondb_owner";
COMMENT ON COLUMN "tekkid-games"."games"."catalog_ids" IS 'Danh sách phân loại tương ứng. VD: ["1","2","3","4","5"]';
COMMENT ON COLUMN "tekkid-games"."games"."image" IS 'Đường dẫn tới hình ảnh game';
COMMENT ON COLUMN "tekkid-games"."games"."plays" IS 'Số lần chơi';
COMMENT ON COLUMN "tekkid-games"."games"."rating" IS 'Đánh giá';
COMMENT ON COLUMN "tekkid-games"."games"."description" IS 'Giới thiệu ngắn game';
COMMENT ON COLUMN "tekkid-games"."games"."instructions" IS 'Cách chơi game';
COMMENT ON COLUMN "tekkid-games"."games"."w" IS 'Kích thước chiều ngang';
COMMENT ON COLUMN "tekkid-games"."games"."h" IS 'Kích thước chiều rộng';
COMMENT ON COLUMN "tekkid-games"."games"."mobile" IS 'Có hỗ trợ điện thoại không';
COMMENT ON COLUMN "tekkid-games"."games"."tag_ids" IS 'danh sách các tag ids tương ứng trong bảng tags. VD : ["1","2","3","4","5"]';
COMMENT ON COLUMN "tekkid-games"."games"."game_url" IS 'Đường dẫn của game, nhúng vào iframe';

-- ----------------------------
-- Indexes structure for table games
-- ----------------------------
CREATE UNIQUE INDEX "game id" ON "tekkid-games"."games" USING btree (
  "id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE UNIQUE INDEX "game slug" ON "tekkid-games"."games" USING btree (
  "slug" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table games
-- ----------------------------
ALTER TABLE "tekkid-games"."games" ADD CONSTRAINT "gm_games_pkey" PRIMARY KEY ("id");
