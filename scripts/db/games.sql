-- Clear existing data
TRUNCATE TABLE "tekkid-games"."games" RESTART IDENTITY;

-- Insert games data
INSERT INTO "tekkid-games"."games" (
  "id",
  "catalog_ids",
  "name",
  "slug",
  "image",
  "plays",
  "rating",
  "description",
  "instructions",
  "w",
  "h",
  "featured",
  "mobile",
  "tag_ids",
  "video_url",
  "game_url",
  "developer"
) VALUES
(0, '["1"]', 'Mahjong Tour', 'mahjong-tour', '/images/games/Mahjong-Tour/512x512.jpg', 3, '0', 'Mahjong Tour game is a cool mahjong game with colorful graphics, challenging levels and appealing themes. Match tiles of the same type and watch them flutter away. Once you clear the screen, the level is finished and you can move on to the next.', '', 400, 600, 0, false, '["1","3"]', null, 'https://html5.gamedistribution.com/ca1c8ab2b0144819b3a30c2f3ae77ab0/?gd_sdk_referrer_url=https://gamedistribution.com/games/mahjong-tour/', 'GameDistribution'),

(1, '["1","2"]', 'Starpoly', 'starpoly', 'https://img.gamemonetize.com/stp68cw05n283o49a9n8qym64knqpbmz/512x384.jpg', 3, '0', 'Pc trading board game which can be played against AI and among family and friends.contains unique features such as lottery and appreciation of properties draws.accept or decline loan and the starbridge.Use site management to settle amount,upgrade,downgrade and sell properties which can be done also by clicking on the corresponding sites/slots.', '', 400, 600, 0, false, '["1","2"]', 'https://v.poki-cdn.com/98630148-0808-491f-b4b3-5272ac6de816/thumbnail.3x3.h265.mp4', 'https://html5.gamemonetize.com/stp68cw05n283o49a9n8qym64knqpbmz/', 'GameMonetize'),

(2, '["3"]', 'Bus School Park Driver', 'bus-school-park-driver', 'https://img.gamemonetize.com/i429yunzarak64517ysvdeki741nrdoc/512x384.jpg', 56, '0', 'Take the wheel in Bus School Park Driver! Master the art of bus driving with precision parking, smooth navigation, and real-world traffic challenges. Whether you''re maneuvering through tight school zones or handling complex parking scenarios, every level tests your skills. Perfect your driving techniques, complete engaging missions, and become the ultimate school bus driver.', '', 400, 600, 1, false, '["3"]', 'https://v.poki-cdn.com/95d7ce97-35ca-4421-b759-79fb88510ea4/thumbnail.2x2.h264.mp4', 'https://html5.gamemonetize.com/i429yunzarak64517ysvdeki741nrdoc/', 'GameMonetize'),
(3, '["1"]', 'Balloons Park', 'balloons-park', 'https://img.gamemonetize.com/806sjmyu8bjoiqhqzlwh3l3ikfyjhfg9/512x384.jpg', 5, '0', 'Get ready for a burst of fun with Balloon Park ! This addictive mobile game challenges you to pop as many colorful balloons as you can before time runs out. With simple controls and vibrant graphics, it''s perfect for players of all ages!', '', 400, 600, 0, false, '["1"]', null, 'https://html5.gamemonetize.com/806sjmyu8bjoiqhqzlwh3l3ikfyjhfg9/', 'GameMonetize'),

(4, '["1"]', 'Stunt Maps', 'stunt-maps', 'https://img.gamemonetize.com/we3v62yymmy7l2m9yuvuxdewrro4tloo/512x384.jpg', 3, '0', 'Stunt Maps Get ready to defy gravity and push your skills to the limit with Stunt Maps, the ultimate stunt driving experience! Jump into a world of high-octane action, where you''ll soar through the skies, navigate impossible loops, and perform jaw-dropping stunts on mind-bending maps. Whether youre racing against time or just showing off your best tricks.', '', 400, 600, 0, false, '["1"]', null, 'https://html5.gamemonetize.com/we3v62yymmy7l2m9yuvuxdewrro4tloo/', 'GameMonetize'),

(5, '["1"]', 'Shape Transform Blob Racing', 'shape-transform-blob-racing', 'https://img.gamemonetize.com/6oqz5gzl1kboj8qfz83uy2dt8tcdutkt/512x384.jpg', 4, '0', 'Shape Transform: Blob Racing is a casual running game. In this game, you will control a little Blob, running, shape-shifting, and go through various challenges!', '', 400, 600, 0, false, '["1"]', null, 'https://html5.gamemonetize.com/6oqz5gzl1kboj8qfz83uy2dt8tcdutkt/', 'GameMonetize'),

(6, '["1"]', 'Addition: Bird Image Uncover', 'addition-bird-image-uncover', 'https://img.gamemonetize.com/0svpruoyftz3vzv7kkaqlfhp02y647k8/512x384.jpg', 3, '0', 'In this game, a bird image is hidden beneath addition expression tiles. Players must drag and drop the correct number bubbles onto the matching tiles to solve the expressions. As each expression is solved, the bird image gradually gets revealed. The goal is to uncover the entire image by completing all the math problems correctly.', '', 400, 600, 0, false, '["1"]', null, 'https://html5.gamemonetize.com/0svpruoyftz3vzv7kkaqlfhp02y647k8/', 'GameMonetize'),

(7, '["1"]', 'Sky Glide', 'sky-glide', 'https://img.gamemonetize.com/h7tc571um0nxwtt1i361t1pfsg2y0cpf/512x384.jpg', 2, '0', 'Sky Glide is a visually captivating sky adventure where players guide a paper plane through a serene, cloud-filled world. The goal is to soar through the bright skies, collecting floating paper planes and avoiding dangerous obstacles like spinning gears and dark void planes. With each level, the challenge increases as the sky becomes more crowded with hazards, testing your precision and reflexes. The peaceful, picturesque setting with fluffy clouds and a soft blue sky creates a relaxing and immersive experience that will keep you engaged as you aim to glide further and achieve a high score in the endless sky.', '', 400, 600, 0, false, '["1"]', null, 'https://html5.gamemonetize.com/h7tc571um0nxwtt1i361t1pfsg2y0cpf/', 'GameMonetize'),

(8, '["1"]', 'Matching Donuts', 'matching-donuts', 'https://img.gamemonetize.com/sjfo1y664ezimxc3cwcyvcjy7onwnakn/512x384.jpg', 3, '0', 'Matching Donuts is a fun and fast-paced puzzle game where you connect colorful donuts to score big! Swipe and match the same donuts in a row before time runs out, challenging your reflexes and strategy. Unlock special power-ups and crazy combos for extra points and higher scores. With vibrant graphics and addictive gameplay, dive into this sugary challenge, master each level, and see how many delicious donuts you can match! Get ready for a sweet adventure that will test your speed, precision, and donut-matching skills!', '', 400, 600, 0, false, '["1"]', null, 'https://html5.gamemonetize.com/sjfo1y664ezimxc3cwcyvcjy7onwnakn/', 'GameMonetize'),

(9, '["1"]', 'Quiz: marvel', 'quiz-marvel', 'https://img.gamemonetize.com/p5t1fa570lc2qs3dwfy57z1xpmxwix1f/512x384.jpg', 4, '0', 'This quiz is dedicated to the amazing and diverse Marvel Universe. You will face over 100 questions that will test how well you know this world. As you progress, you will encounter Superheroes many times who have valuable advice prepared for you. They will help you move forward. Remember, each question has exactly one correct answer. And each mistake will cost you hearts. Additionally, each mistake will keep you from your next meeting with a Superhero. But dont despair if you lose all your hearts. Youll always have one last chance. Be attentive! And good luck!', '', 400, 600, 0, false, '["1"]', null, 'https://html5.gamemonetize.com/p5t1fa570lc2qs3dwfy57z1xpmxwix1f/', 'GameMonetize'),

(10, '["1"]', 'Buddy Blocks Survival', 'buddy-blocks-survival', 'https://img.gamemonetize.com/be8pyvxsqm5e3x42sioft7pa9iw0sk36/512x384.jpg', 4, '0', 'Buddy Blocks Survival is an engaging online game suitable for both kids and adults. The game combines fun, strategy, and quick thinking, making it an entertaining challenge for all ages. Here''s a breakdown of the game: Objective: The primary goal is to get Buddy safely to the floor by eliminating the blocks beneath him. However, it''s not as easy as it sounds, as there are various obstacles to avoid.', '', 400, 600, 0, false, '["1"]', null, 'https://html5.gamemonetize.com/be8pyvxsqm5e3x42sioft7pa9iw0sk36/', 'GameMonetize'),

(11, '["1"]', 'Dream Pet Merge', 'dream-pet-merge', 'https://img.gamemonetize.com/pxaljcmses6wtkfy457uw0sh03d2jys5/512x384.jpg', 3, '0', 'Dream Pet Merge is a fun game where you drop different pets to merge them. Match the same pets to create new, higher-level pets. Keep merging to discover all pets and reach a high score. The game is endless, with many cute pets to collect and enjoy!', '', 400, 600, 0, false, '["1"]', null, 'https://html5.gamemonetize.com/pxaljcmses6wtkfy457uw0sh03d2jys5/', 'GameMonetize'),

(12, '["1"]', 'Elite Chess', 'elite-chess', 'https://img.gamemonetize.com/65ycjh2i3vf7048fvbeyr50rkwfcbfnl/512x384.jpg', 4, '0', 'Enjoy classic gameplay with three chess modes, each offering varying time settings suited to your play style. Take your chess skills to the next level, climb the ranks from Bronze to Diamond, and strive to become a top chess player.', '', 400, 600, 0, false, '["1"]', null, 'https://html5.gamemonetize.com/65ycjh2i3vf7048fvbeyr50rkwfcbfnl/', 'GameMonetize'),

(13, '["1"]', 'Tower Blocks', 'tower-blocks', 'https://img.gamemonetize.com/65ycjh2i3vf7048fvbeyr50rkwfcbfnl/512x384.jpg', 4, '0', 'Enjoy classic gameplay with three chess modes, each offering varying time settings suited to your play style. Take your chess skills to the next level, climb the ranks from Bronze to Diamond, and strive to become a top chess player.', '', 400, 600, 0, false, '["1"]', null, 'https://html5.gamemonetize.com/65ycjh2i3vf7048fvbeyr50rkwfcbfnl/', 'GameMonetize');