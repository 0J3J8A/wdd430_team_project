// src/app/artisans/[slug]/loading.tsx
// Shown instantly while the server fetches artisan data.
// Mirrors the real profile page layout so there is no visual jump on load.

const colors = {
  primary:        '#5C4033',
  background:     '#FAF7F4',
  backgroundWarm: '#EDE0D4',
  border:         '#E0D0C0',
  dark:           '#3A2820',
};

function Shimmer({
  width = '100%',
  height = '1rem',
  radius = '6px',
}: {
  width?: string;
  height?: string;
  radius?: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        width,
        height,
        borderRadius: radius,
        background: `linear-gradient(90deg, ${colors.border} 25%, ${colors.backgroundWarm} 50%, ${colors.border} 75%)`,
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.4s ease-in-out infinite',
      }}
    />
  );
}

export default function Loading() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: colors.background, borderBottom: `0.5px solid ${colors.border}`, padding: '0.75rem 2rem' }}>
        <Shimmer width="200px" height="0.8rem" />
      </div>

      {/* Profile header */}
      <div
        aria-busy="true"
        aria-label="Loading artisan profile…"
        style={{ backgroundColor: colors.backgroundWarm, padding: '4rem 2rem' }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2.5rem', alignItems: 'start' }}>
          <Shimmer width="120px" height="120px" radius="50%" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Shimmer width="100px" height="0.7rem" />
            <Shimmer width="260px" height="2rem" radius="8px" />
            <Shimmer width="200px" height="0.85rem" />
            <div style={{ display: 'flex', gap: '2rem' }}>
              <Shimmer width="60px" height="2rem" radius="6px" />
              <Shimmer width="60px" height="2rem" radius="6px" />
              <Shimmer width="80px" height="2rem" radius="6px" />
            </div>
          </div>
        </div>
      </div>

      {/* Biography */}
      <div style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <Shimmer width="180px" height="1.4rem" />
        <div style={{ borderLeft: `3px solid ${colors.border}`, paddingLeft: '2rem', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Shimmer height="1rem" />
          <Shimmer height="1rem" width="90%" />
          <Shimmer height="1rem" width="95%" />
          <Shimmer height="1rem" width="75%" />
          <Shimmer height="1rem" width="85%" />
          <Shimmer height="1rem" width="70%" />
        </div>
      </div>

      {/* Products grid */}
      <div style={{ backgroundColor: colors.backgroundWarm, padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Shimmer width="160px" height="1.4rem" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ backgroundColor: colors.background, borderRadius: '12px', border: `0.5px solid ${colors.border}`, overflow: 'hidden' }}>
                <Shimmer height="140px" radius="0" />
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Shimmer width="80%" height="1rem" />
                  <Shimmer width="60%" height="0.85rem" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                    <Shimmer width="60px" height="1rem" radius="4px" />
                    <Shimmer width="80px" height="1.8rem" radius="8px" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: colors.dark, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div
          aria-hidden="true"
          style={{
            width: '140px', height: '0.875rem', borderRadius: '6px',
            background: 'linear-gradient(90deg, #4A3020 25%, #5C4033 50%, #4A3020 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s ease-in-out infinite',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            width: '220px', height: '0.8rem', borderRadius: '6px',
            background: 'linear-gradient(90deg, #4A3020 25%, #5C4033 50%, #4A3020 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s ease-in-out infinite',
          }}
        />
      </div>
    </>
  );
}