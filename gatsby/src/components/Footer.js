import React from 'react';

export default function Footer() {
  return (
    <footer>
      <p className="center">
        &copy; Slater's Slices {new Date().getFullYear()}
      </p>
    </footer>
  );
}
