import 'package:flutter/material.dart';
import '../models/caregiver.dart';
import 'caregiver_details_page.dart';

class CaregiverListPage extends StatelessWidget {
  const CaregiverListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 90,
        title: Row(
          children: [
            Image.asset('assets/images/logo.png', height: 70),
            const SizedBox(width: 12),
            const Text('AmigoPet'),
          ],
        ),
        leading: Builder(
          builder: (context) => IconButton(
            icon: const Icon(Icons.menu),
            onPressed: () => Scaffold.of(context).openDrawer(),
          ),
        ),
        actions: [
          PopupMenuButton<String>(
            onSelected: (value) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text('Ordenando por: $value')),
              );
            },
            itemBuilder: (context) => [
              const PopupMenuItem(value: 'Mais próximos', child: Text('Mais próximos')),
              const PopupMenuItem(value: 'Melhor avaliados', child: Text('Melhor avaliados')),
            ],
            icon: const Icon(Icons.filter_list),
          ),
        ],
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(color: Theme.of(context).colorScheme.primary),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Image.asset('assets/images/logo.png', height: 80),
                  const SizedBox(height: 10),
                  const Text('AmigoPet', style: TextStyle(color: Colors.white, fontSize: 24)),
                ],
              ),
            ),
            ListTile(leading: const Icon(Icons.people), title: const Text('Cuidadores'), onTap: () => Navigator.pop(context)),
            ListTile(leading: const Icon(Icons.calendar_today), title: const Text('Meus agendamentos'), onTap: () => Navigator.pop(context)),
            ListTile(leading: const Icon(Icons.settings), title: const Text('Configurações'), onTap: () => Navigator.pop(context)),
          ],
        ),
      ),
      body: ListView.builder(
        itemCount: caregivers.length,
        itemBuilder: (context, index) {
          final caregiver = caregivers[index];
          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
            child: ListTile(
              title: Text(caregiver.name),
              subtitle: Text('${caregiver.distance} • ⭐ ${caregiver.rating}'),
              trailing: const Icon(Icons.chevron_right),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => CaregiverDetailsPage(caregiver: caregiver)),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
