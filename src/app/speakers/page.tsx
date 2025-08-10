import SpeakersList from '../components/speakersList/speakersList';

export default function SpeakersPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Our Speakers
      </h1>
      <SpeakersList />
    </main>
  );
}
