import React from "react";

const ProfileIntro = () => (
  <section id="profile-intro" className="profile-section" style={{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 32,
  }}>
    <h1 style={{ textAlign: 'center' }}>
      🖼️ Personal Gallery
      <br />
      Olivier's Friday Art Journey 🎨
    </h1>
    <img
      src={new URL('./assets/annex/Picture_OJ.jpg', import.meta.url).href}
      alt="Olivier Jaubert"
      style={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    />
    <div style={{ fontStyle: 'italic', fontSize: 18, marginBottom: 8 }}>
      Biomedical Imaging Scientist 🧬 during the week, but Artist 🎨 on Fridays
    </div>
    <blockquote style={{ maxWidth: 500, textAlign: 'center', fontSize: 16, margin: 0 }}>
      Working 4 days a week opens up quite a bit of opportunities to explore new things 🌱.
      With no one around to sidetrack you, it gives you the free time you need—with no valid
      excuses to not try 🚀. Science and Art are fun 😂 ❤️.
    </blockquote>
  </section>
);

export default ProfileIntro;
