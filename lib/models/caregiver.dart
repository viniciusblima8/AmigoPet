class Caregiver {
  final String name;
  final String description;
  final double rating;
  final String distance;
  final String imageUrl;

  Caregiver({
    required this.name,
    required this.description,
    required this.rating,
    required this.distance,
    required this.imageUrl,
  });
}

final List<Caregiver> caregivers = [
  Caregiver(
    name: 'Ana Silva',
    description: 'Apaixonada por cães de grande porte. Tenho 5 anos de experiência.',
    rating: 4.9,
    distance: '0.5 km',
    imageUrl: 'https://i.pravatar.cc/150?u=ana',
  ),
  Caregiver(
    name: 'Bruno Souza',
    description: 'Cuidador de gatos experiente. Adoro brincar com felinos.',
    rating: 4.7,
    distance: '1.2 km',
    imageUrl: 'https://i.pravatar.cc/150?u=bruno',
  ),
  Caregiver(
    name: 'Carla Oliveira',
    description: 'Passeadora certificada. Foco em bem-estar e exercícios.',
    rating: 5.0,
    distance: '0.8 km',
    imageUrl: 'https://i.pravatar.cc/150?u=carla',
  ),
  Caregiver(
    name: 'Daniel Lima',
    description: 'Disponível para hospedagem em casa com quintal grande.',
    rating: 4.8,
    distance: '2.5 km',
    imageUrl: 'https://i.pravatar.cc/150?u=daniel',
  ),
  Caregiver(
    name: 'Elena Costa',
    description: 'Especialista em pets idosos e que precisam de medicação.',
    rating: 4.6,
    distance: '1.5 km',
    imageUrl: 'https://i.pravatar.cc/150?u=elena',
  ),
];
