export default function Header({ onToggle }: { onToggle: () => void }) {
  return (
    <header className="header">
      <button className="menu-toggle" onClick={onToggle}>
        ≡
      </button>

      <div className="header-right">
        <div>admin</div>
        <div className="header-right-avatar">x</div>
      </div>
    </header>
  );
}
