import React, { useState, useEffect } from "react";

const defaultAvatars = [
  "/globe.svg",
  "/window.svg",
  "/vercel.svg",
  "/next.svg",
];

const Profile = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(defaultAvatars[0]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      const { name, avatar } = JSON.parse(saved);
      setName(name);
      setAvatar(avatar);
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify({ name, avatar }));
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="max-w-md mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 mt-10 text-center">
        <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">Edit Profile</h2>
        <input
          className="border p-2 rounded mb-4 w-full"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className="flex justify-center gap-4 mb-4">
          {defaultAvatars.map((av, idx) => (
            <img
              key={idx}
              src={av}
              alt="avatar"
              className={`w-12 h-12 rounded-full border-2 cursor-pointer ${avatar === av ? 'border-[var(--primary)]' : 'border-gray-300'}`}
              onClick={() => setAvatar(av)}
            />
          ))}
        </div>
        <button
          onClick={saveProfile}
          className="bg-[var(--primary)] text-white font-bold py-2 px-6 rounded-full hover:bg-[var(--secondary)] transition"
        >
          Save
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-lg p-8 mt-10 text-center">
      <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">Profile</h2>
      <img src={avatar} alt="avatar" className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-[var(--primary)]" />
      <div className="text-lg font-semibold mb-2">{name || 'Your Name'}</div>
      <button
        onClick={() => setEditing(true)}
        className="bg-[var(--primary)] text-white font-bold py-2 px-6 rounded-full hover:bg-[var(--secondary)] transition"
      >
        Edit
      </button>
    </div>
  );
};

export default Profile;
