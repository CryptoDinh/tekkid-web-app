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

 Date: 24/04/2025 13:02:51
*/


-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS "tekkid-games"."categories";
CREATE TABLE "tekkid-games"."categories" (
  "id" int4 NOT NULL,
  "slug" varchar(250) COLLATE "pg_catalog"."default" NOT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "image" varchar(400) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default",
  "featured" int2 NOT NULL DEFAULT 0
)
;
ALTER TABLE "tekkid-games"."categories" OWNER TO "neondb_owner";
COMMENT ON COLUMN "tekkid-games"."categories"."image" IS 'Đường dẫn tương đối';
COMMENT ON COLUMN "tekkid-games"."categories"."featured" IS 'Ưu tiên hiển thị to hơn';

-- ----------------------------
-- Records of categories
-- ----------------------------
BEGIN;
INSERT INTO "tekkid-games"."categories" ("id", "slug", "name", "image", "description", "featured") VALUES (5, 'sports', 'Sports', '/images/categories/sports.png', 'Compete in various athletic challenges', 1);
INSERT INTO "tekkid-games"."categories" ("id", "slug", "name", "image", "description", "featured") VALUES (6, 'racing', 'Racing', '/images/categories/racing.png', 'Speed through tracks and outpace opponents', 0);
INSERT INTO "tekkid-games"."categories" ("id", "slug", "name", "image", "description", "featured") VALUES (7, 'rpg', 'RPG', '/images/categories/rpg.png', 'Immerse yourself in rich storylines and character development', 1);
INSERT INTO "tekkid-games"."categories" ("id", "slug", "name", "image", "description", "featured") VALUES (8, 'simulation', 'Simulation', '/images/categories/simulation.png', 'Experience realistic scenarios and management', 0);
INSERT INTO "tekkid-games"."categories" ("id", "slug", "name", "image", "description", "featured") VALUES (10, 'multiplayer', 'Multiplayer', '/images/categories/multiplayer.png', 'Compete or cooperate with other players online', 0);
INSERT INTO "tekkid-games"."categories" ("id", "slug", "name", "image", "description", "featured") VALUES (9, 'fighting', 'Fighting', '/images/categories/fighting.png', '', 1);
INSERT INTO "tekkid-games"."categories" ("id", "slug", "name", "image", "description", "featured") VALUES (1, 'action', 'Action', '/images/categories/action.avif', 'Fast-paced games with intense gameplay', 1);
INSERT INTO "tekkid-games"."categories" ("id", "slug", "name", "image", "description", "featured") VALUES (3, 'puzzle', 'Puzzle', '/images/categories/puzzle.avif', 'Challenge your mind with brain teasers', 1);
INSERT INTO "tekkid-games"."categories" ("id", "slug", "name", "image", "description", "featured") VALUES (2, 'adventure', 'Adventure', '/images/categories/adventure.avif', 'Explore new worlds and solve puzzles', 0);
INSERT INTO "tekkid-games"."categories" ("id", "slug", "name", "image", "description", "featured") VALUES (4, 'strategy', 'Strategy', '/images/categories/strategy.avif', 'Plan, build, and conquer', 0);
COMMIT;

-- ----------------------------
-- Primary Key structure for table categories
-- ----------------------------
ALTER TABLE "tekkid-games"."categories" ADD CONSTRAINT "gm_categories_pkey" PRIMARY KEY ("id");
