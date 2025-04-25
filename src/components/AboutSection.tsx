
import React, { useEffect, useState } from 'react';

export default function AboutSection() {

  return (
    <article className="about-section">
      <div className="about-title">About GameHub</div>
      <header>
        <h1>Free Online Games</h1>
      </header>
      <div className="about-content">
        <p>
          GameHub has the best free online games selection and offers the most fun experience to play alone or with friends. We offer instant play to all our games without downloads, login, popups or other distractions. Our games are playable on desktop, tablet and mobile so you can enjoy them at home or on the road. Every month over 30 million gamers from all over the world play their favorite games on GameHub.
        </p>
        <h3>Our game selection</h3>
        <p>
          Game developers release fun new games on our platform on a daily basis. Our most Popular Games include hits like Subway Surfers, Temple Run 2, Stickman Hook and Rodeo Stampede. We also have online classics like Moto X3M, 2048, and Bad Ice-Cream to play for free. In total we offer more than 1000 game titles.
        </p>
        <h3>Start playing</h3>
        <p>
          Unsure what game to play? Start your game discovery on our homepage or pick a game from any of these popular categories:
        </p>
        <ul>
          <li>Puzzle Games</li>
          <li>Action Games</li>
          <li>2 Player Games</li>
          <li>Car Games</li>
          <li>Shooting Games</li>
        </ul>
      </div>
    </article>
  );
}