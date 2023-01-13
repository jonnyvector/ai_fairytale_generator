import React, { useState } from "react";

function CharacterRole(props) {
  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="hero"
          checked={role === "hero"}
          onChange={handleRoleChange}
        />
        Hero
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="villain"
          checked={role === "villain"}
          onChange={handleRoleChange}
        />
        Villain
      </label>
      <br />
      <p>Selected role: {role}</p>
    </div>
  );
}

export default CharacterRole;
