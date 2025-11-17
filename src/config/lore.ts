export interface LoreEntry {
  id: string
  title: string
  text: string
  image?: string
}

export const loreEntries: LoreEntry[] = [
  {
    id: 'origin',
    title: 'The Beginning',
    text: 'In the depths of creative exploration, WYKILLA emerged from the fusion of sound, vision, and code. A journey that started with a single beat evolved into a multidimensional artistic universe.',
  },
  {
    id: 'sound',
    title: 'Sound Design',
    text: "Melodic Techno is not just music—it's an emotional landscape. Every track is crafted to take listeners on a cinematic journey through carefully designed soundscapes.",
  },
  {
    id: 'vision',
    title: '3D Worlds',
    text: 'Using Unreal Engine and Blender, WYKILLA creates immersive 3D environments that complement the music. Visual storytelling meets sonic exploration.',
  },
  {
    id: 'future',
    title: 'AI Innovation',
    text: "The future of creativity lies in the intersection of human intuition and artificial intelligence. WYKILLA's AI tools empower artists to push creative boundaries.",
  },
]
