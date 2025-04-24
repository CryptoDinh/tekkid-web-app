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

 Date: 24/04/2025 13:04:56
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
  "developer" varchar(250) COLLATE "pg_catalog"."default" DEFAULT 'TekKid'::character varying
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
-- Records of games
-- ----------------------------
BEGIN;
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["1","2"]', 'Starpoly', 'https://img.gamemonetize.com/stp68cw05n283o49a9n8qym64knqpbmz/512x384.jpg', 3, '0', 'Pc trading board game which can be played against AI and among family and friends.contains unique features such as lottery and appreciation of properties draws.accept or decline loan and the starbridge.Use site management to settle amount,upgrade,downgrade and sell properties which can be done also by clicking on the corresponding sites/slots.', '', 400, 600, 0, 'f', '["1","2"]', 'https://v.poki-cdn.com/98630148-0808-491f-b4b3-5272ac6de816/thumbnail.3x3.h265.mp4', 1, 'starpoly', 'https://html5.gamemonetize.com/stp68cw05n283o49a9n8qym64knqpbmz/', 'GameMonetize');
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["1"]', 'Sky Glide', 'https://img.gamemonetize.com/h7tc571um0nxwtt1i361t1pfsg2y0cpf/512x384.jpg', 2, '0', 'Sky Glide is a visually captivating sky adventure where players guide a paper plane through a serene, cloud-filled world. The goal is to soar through the bright skies, collecting floating paper planes and avoiding dangerous obstacles like spinning gears and dark void planes. With each level, the challenge increases as the sky becomes more crowded with hazards, testing your precision and reflexes. The peaceful, picturesque setting with fluffy clouds and a soft blue sky creates a relaxing and immersive experience that will keep you engaged as you aim to glide further and achieve a high score in the endless sky.', '', 400, 600, 0, 'f', '["1"]', NULL, 7, 'sky-glide', 'https://html5.gamemonetize.com/h7tc571um0nxwtt1i361t1pfsg2y0cpf/', 'GameMonetize');
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["1"]', 'Buddy Blocks Survival', 'https://img.gamemonetize.com/be8pyvxsqm5e3x42sioft7pa9iw0sk36/512x384.jpg', 4, '0', 'Buddy Blocks Survival is an engaging online game suitable for both kids and adults. The game combines fun, strategy, and quick thinking, making it an entertaining challenge for all ages. Here''s a breakdown of the game: Objective: The primary goal is to get Buddy safely to the floor by eliminating the blocks beneath him. However, it''s not as easy as it sounds, as there are various obstacles to avoid.', '', 400, 600, 0, 'f', '["1"]', NULL, 10, 'buddy-blocks-survival', 'https://html5.gamemonetize.com/be8pyvxsqm5e3x42sioft7pa9iw0sk36/', 'GameMonetize');
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["1"]', 'Addition: Bird Image Uncover', 'https://img.gamemonetize.com/0svpruoyftz3vzv7kkaqlfhp02y647k8/512x384.jpg', 5, '0', 'In this game, a bird image is hidden beneath addition expression tiles. Players must drag and drop the correct number bubbles onto the matching tiles to solve the expressions. As each expression is solved, the bird image gradually gets revealed. The goal is to uncover the entire image by completing all the math problems correctly.', '', 400, 600, 0, 'f', '["1"]', NULL, 6, 'addition-bird-image-uncover', 'https://html5.gamemonetize.com/0svpruoyftz3vzv7kkaqlfhp02y647k8/', 'GameMonetize');
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["1"]', 'Stunt Maps', 'https://img.gamemonetize.com/we3v62yymmy7l2m9yuvuxdewrro4tloo/512x384.jpg', 11, '0', 'Stunt Maps Get ready to defy gravity and push your skills to the limit with Stunt Maps, the ultimate stunt driving experience! Jump into a world of high-octane action, where you''ll soar through the skies, navigate impossible loops, and perform jaw-dropping stunts on mind-bending maps. Whether youre racing against time or just showing off your best tricks.', '', 400, 600, 0, 'f', '["1"]', NULL, 4, 'stunt-maps', 'https://html5.gamemonetize.com/we3v62yymmy7l2m9yuvuxdewrro4tloo/', 'GameMonetize');
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["1"]', 'Quiz: marvel', 'https://img.gamemonetize.com/p5t1fa570lc2qs3dwfy57z1xpmxwix1f/512x384.jpg', 6, '0', 'This quiz is dedicated to the amazing and diverse Marvel Universe. You will face over 100 questions that will test how well you know this world. As you progress, you will encounter Superheroes many times who have valuable advice prepared for you. They will help you move forward. Remember, each question has exactly one correct answer. And each mistake will cost you hearts. Additionally, each mistake will keep you from your next meeting with a Superhero. But dont despair if you lose all your hearts. Youll always have one last chance. Be attentive! And good luck!', '', 400, 600, 0, 'f', '["1"]', NULL, 9, 'quiz-marvel', 'https://html5.gamemonetize.com/p5t1fa570lc2qs3dwfy57z1xpmxwix1f/', 'GameMonetize');
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["1"]', 'Matching Donuts', 'https://img.gamemonetize.com/sjfo1y664ezimxc3cwcyvcjy7onwnakn/512x384.jpg', 5, '0', 'Matching Donuts is a fun and fast-paced puzzle game where you connect colorful donuts to score big! Swipe and match the same donuts in a row before time runs out, challenging your reflexes and strategy. Unlock special power-ups and crazy combos for extra points and higher scores. With vibrant graphics and addictive gameplay, dive into this sugary challenge, master each level, and see how many delicious donuts you can match! Get ready for a sweet adventure that will test your speed, precision, and donut-matching skills!', '', 400, 600, 0, 'f', '["1"]', NULL, 8, 'matching-donuts', 'https://html5.gamemonetize.com/sjfo1y664ezimxc3cwcyvcjy7onwnakn/', 'GameMonetize');
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["3"]', 'Bus School Park Driver', 'https://img.gamemonetize.com/i429yunzarak64517ysvdeki741nrdoc/512x384.jpg', 56, '0', 'Take the wheel in Bus School Park Driver! Master the art of bus driving with precision parking, smooth navigation, and real-world traffic challenges. Whether you''re maneuvering through tight school zones or handling complex parking scenarios, every level tests your skills. Perfect your driving techniques, complete engaging missions, and become the ultimate school bus driver.', '', 400, 600, 1, 'f', '["3"]', NULL, 2, 'bus-school-park-driver', 'https://html5.gamemonetize.com/i429yunzarak64517ysvdeki741nrdoc/', 'GameMonetize');
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["1"]', 'Dream Pet Merge', 'https://img.gamemonetize.com/pxaljcmses6wtkfy457uw0sh03d2jys5/512x384.jpg', 11, '0', 'Dream Pet Merge is a fun game where you drop different pets to merge them. Match the same pets to create new, higher-level pets. Keep merging to discover all pets and reach a high score. The game is endless, with many cute pets to collect and enjoy!', '', 400, 600, 0, 'f', '["1"]', NULL, 11, 'dream-pet-merge', 'https://html5.gamemonetize.com/pxaljcmses6wtkfy457uw0sh03d2jys5/', 'GameMonetize');
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["1"]', 'Shape Transform Blob Racing', 'https://img.gamemonetize.com/6oqz5gzl1kboj8qfz83uy2dt8tcdutkt/512x384.jpg', 8, '0', 'Shape Transform: Blob Racing is a casual running game. In this game, you will control a little Blob, running, shape-shifting, and go through various challenges!', '', 400, 600, 0, 'f', '["1"]', NULL, 5, 'shape-transform-blob-racing', 'https://html5.gamemonetize.com/6oqz5gzl1kboj8qfz83uy2dt8tcdutkt/', 'GameMonetize');
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["1"]', 'Elite Chess', 'https://img.gamemonetize.com/65ycjh2i3vf7048fvbeyr50rkwfcbfnl/512x384.jpg', 10, '0', 'Enjoy classic gameplay with three chess modes, each offering varying time settings suited to your play style. Take your chess skills to the next level, climb the ranks from Bronze to Diamond, and strive to become a top chess player.', '', 400, 600, 0, 'f', '["1"]', NULL, 12, 'elite-chess', 'https://html5.gamedistribution.com/d0e4bfcfc5c4410fa1f5ed026b3d32de', ' jimo game');
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["1"]', 'Mahjong Tour', '/images/games/Mahjong-Tour/512x512.jpg', 213, '0', 'Mahjong Tour game is a cool mahjong game with colorful graphics, challenging levels and appealing themes. Match tiles of the same type and watch them flutter away. Once you clear the screen, the level is finished and you can move on to the next.', '', 400, 600, 0, 'f', '["1","3"]', NULL, 0, 'mahjong-tour', 'https://html5.gamedistribution.com/ca1c8ab2b0144819b3a30c2f3ae77ab0/?gd_sdk_referrer_url=https://gamedistribution.com/games/mahjong-tour/', 'GameDistribution');
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["1"]', 'Balloons Park', 'https://img.gamemonetize.com/806sjmyu8bjoiqhqzlwh3l3ikfyjhfg9/512x384.jpg', 17, '0', 'Get ready for a burst of fun with Balloon Park ! This addictive mobile game challenges you to pop as many colorful balloons as you can before time runs out. With simple controls and vibrant graphics, it''s perfect for players of all ages!', '', 400, 600, 0, 'f', '["1"]', NULL, 3, 'balloons-park', 'https://html5.gamemonetize.com/806sjmyu8bjoiqhqzlwh3l3ikfyjhfg9/', 'GameMonetize');
INSERT INTO "tekkid-games"."games" ("catalog_ids", "name", "image", "plays", "rating", "description", "instructions", "w", "h", "featured", "mobile", "tag_ids", "video_url", "id", "slug", "game_url", "developer") VALUES ('["1"]', 'SPRUNKI GETS SURGERY', '/images/games/sprunki-gets-surgery/512x512.jpg', 77, '0', 'SPRUNKI GETS SURGERY ?? OREN, a genius (but reckless) surgeon, must save PINKI after a brutal facial injury—without anesthesia! As more SPRUNKIS like TUNNER, shot in the head, flood the ER, OREN races against time. But lurking in the shadows is BLACK, ready to turn OREN’s mission into a nightmare. Will OREN save them all, or will BLACK end it in tragedy?', '', 400, 600, 0, 'f', '["1"]', NULL, 13, 'sprunki-gets-surgery', 'https://html5.gamedistribution.com/d0e4bfcfc5c4410fa1f5ed026b3d32de', ' jimo game');
COMMIT;

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
