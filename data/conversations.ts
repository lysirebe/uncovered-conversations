export type Area = 'Vision' | 'Intention' | 'Finance' | 'Career' | 'Wellness' | 'Fashion' | 'Faith'

export interface Episode {
  id: string
  n: string
  name: string
  topic: string
  area: Area
  src: string
}

export const CHIPS = ['All', 'Vision', 'Intention', 'Finance', 'Career', 'Wellness', 'Fashion', 'Faith'] as const

export const S2: Episode[] = [
  { id: 's2-5', n: '005', name: 'Imade Ogbemudia', topic: 'Evolving with the Vision', area: 'Vision', src: '/assets/conv/s2ep005.avif' },
  { id: 's2-4', n: '004', name: 'Ore Lawani', topic: 'Building with Intention', area: 'Intention', src: '/assets/conv/s2ep004.avif' },
  { id: 's2-3', n: '003', name: 'Lanaire Aderemi', topic: 'Walking on Your Unique Path', area: 'Vision', src: '/assets/conv/s2ep003.avif' },
  { id: 's2-2', n: '002', name: 'Delphine Chui', topic: 'Having Courage to Pivot', area: 'Vision', src: '/assets/conv/s2ep002.avif' },
  { id: 's2-1', n: '001', name: 'Dekola Thompson', topic: 'Running with the Vision', area: 'Vision', src: '/assets/conv/s2ep001.avif' },
]

export const S1: Episode[] = [
  { id: 's1-31', n: '031', name: 'Fego Achakobe', topic: 'Entering into the Creative Industry', area: 'Career', src: '/assets/conv/ep031.avif' },
  { id: 's1-30', n: '030', name: 'Bimpe Abiade', topic: 'Beginning Again', area: 'Vision', src: '/assets/conv/ep030.avif' },
  { id: 's1-29', n: '029', name: 'Shide Ugbaje', topic: 'Uncovering to Heal', area: 'Wellness', src: '/assets/conv/ep029.avif' },
  { id: 's1-28', n: '028', name: 'Ore Ogunbiyi', topic: 'Paving the Way in Creative Writing', area: 'Career', src: '/assets/conv/ep028.avif' },
  { id: 's1-27', n: '027', name: 'Joyce Omatseye', topic: 'Creating Space in the Medical Field', area: 'Career', src: '/assets/conv/ep027.avif' },
  { id: 's1-26', n: '026', name: 'Lu Adesola', topic: 'Trailblazing the Fashion Industry', area: 'Fashion', src: '/assets/conv/ep026.avif' },
  { id: 's1-25', n: '025', name: 'Tomi Sodimu', topic: 'Navigating the Beauty Industry', area: 'Fashion', src: '/assets/conv/ep025.avif' },
  { id: 's1-24', n: '024', name: 'Ijeoma Adesanya', topic: 'Standing Firm', area: 'Vision', src: '/assets/conv/ep024.avif' },
  { id: 's1-23', n: '023', name: 'Temidayo Seriki', topic: 'Vulnerability & Empowerment', area: 'Wellness', src: '/assets/conv/ep023.avif' },
  { id: 's1-22', n: '022', name: 'Abiola Babarinde', topic: 'Trusting the Process & Owning your Journey', area: 'Vision', src: '/assets/conv/ep022.avif' },
  { id: 's1-21', n: '021', name: 'Uzoma Iroche', topic: 'Healing Through Pain', area: 'Wellness', src: '/assets/conv/ep021.avif' },
  { id: 's1-20', n: '020', name: 'Leke Subair', topic: 'Trusting the Process', area: 'Vision', src: '/assets/conv/ep020.avif' },
  { id: 's1-19', n: '019', name: 'Bukiie Smart', topic: 'Navigating Finances whilst Living a Wholesome Life', area: 'Finance', src: '/assets/conv/ep019.avif' },
  { id: 's1-18', n: '018', name: 'Daniel Adesiyan', topic: 'Owning & Having Confidence in your Story', area: 'Vision', src: '/assets/conv/ep018.avif' },
  { id: 's1-17', n: '017', name: 'Mazino Malaka', topic: 'Shedding and Blooming to Become', area: 'Wellness', src: '/assets/conv/ep017.avif' },
  { id: 's1-16', n: '016', name: 'Toyosi Alexis', topic: 'Letting Go and Embracing the New', area: 'Vision', src: '/assets/conv/ep016.avif' },
  { id: 's1-15', n: '015', name: 'Dolapo Morgan', topic: 'Staying Rooted in your Identity', area: 'Faith', src: '/assets/conv/ep015.avif' },
  { id: 's1-14', n: '014', name: 'Arese Ugwu', topic: 'Positioning yourself with Intentionality in Mind', area: 'Intention', src: '/assets/conv/ep014.avif' },
  { id: 's1-13', n: '013', name: 'Oyinkan Olagbegi', topic: 'Embracing Trailblazing', area: 'Career', src: '/assets/conv/ep013.avif' },
  { id: 's1-12', n: '012', name: 'Lamide Odanye', topic: 'Pursuing Purpose Through Authenticity', area: 'Vision', src: '/assets/conv/ep012.avif' },
  { id: 's1-11', n: '011', name: 'Tilewa Odedina', topic: 'Having Confidence in your Calling pt.2', area: 'Faith', src: '/assets/conv/ep011.avif' },
  { id: 's1-10', n: '010', name: 'Tilewa Odedina', topic: 'Having Confidence in your Calling pt.1', area: 'Faith', src: '/assets/conv/ep010.avif' },
  { id: 's1-9', n: '009', name: 'Tsemaye Jemide', topic: 'Walking with Intention', area: 'Intention', src: '/assets/conv/ep009.avif' },
  { id: 's1-8', n: '008', name: 'Ruth Akiba', topic: 'Entering the Industry with Purpose in Mind', area: 'Career', src: '/assets/conv/ep008.avif' },
  { id: 's1-7', n: '007', name: 'Funke Braithwaite', topic: 'Owning & Walking in your Unique Journey', area: 'Career', src: '/assets/conv/ep007.avif' },
  { id: 's1-6', n: '006', name: 'Karis Onyemenam', topic: 'Breaking into Finance & Trusting the Process pt.2', area: 'Finance', src: '/assets/conv/ep006.avif' },
  { id: 's1-5', n: '005', name: 'Ore Okubajo', topic: 'Finances and Wellness — can we integrate them?', area: 'Finance', src: '/assets/conv/ep005.avif' },
  { id: 's1-4', n: '004', name: 'Karis Onyemenam', topic: 'Breaking into Finance & Trusting the Process pt.1', area: 'Finance', src: '/assets/conv/ep004.avif' },
  { id: 's1-3', n: '003', name: 'Demi Osunsina', topic: 'Navigating Finances with Wholeness in Mind', area: 'Finance', src: '/assets/conv/ep003.avif' },
  { id: 's1-2', n: '002', name: 'Tinu Janelle Okotore', topic: 'Starting early with your finances — is it worth it?', area: 'Finance', src: '/assets/conv/ep002.avif' },
  { id: 's1-1', n: '001', name: 'Dunni Oladapo', topic: 'Personal & Business Finance: Budgeting & First-Time Mistakes', area: 'Finance', src: '/assets/conv/ep001.avif' },
]
