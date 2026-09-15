import 'package:flutter/material.dart';
import '../models/caregiver.dart';

class CaregiverDetailsPage extends StatelessWidget {
  final Caregiver caregiver;

  const CaregiverDetailsPage({super.key, required this.caregiver});

  void _confirmarCancelamento(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirmar cancelamento'),
        content: const Text('Tem certeza que deseja cancelar o agendamento?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Não')),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Agendamento cancelado.')));
            },
            child: const Text('Sim'),
          ),
        ],
      ),
    );
  }

  void _selecionarServico(BuildContext context) {
    showDialog<String>(
      context: context,
      builder: (context) => SimpleDialog(
        title: const Text('Selecione o tipo de serviço'),
        children: ['Passeio', 'Hospedagem', 'Banho e tosa'].map((servico) {
          return SimpleDialogOption(
            onPressed: () => Navigator.pop(context, servico),
            child: Text(servico),
          );
        }).toList(),
      ),
    ).then((value) {
      if (value != null && context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Serviço selecionado: $value')));
      }
    });
  }

  void _mostrarMaisOpcoes(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (context) => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          ListTile(leading: const Icon(Icons.share), title: const Text('Compartilhar perfil'), onTap: () => Navigator.pop(context)),
          ListTile(leading: const Icon(Icons.report), title: const Text('Denunciar'), onTap: () => Navigator.pop(context)),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 90,
        title: Row(
          children: [
            Image.asset('assets/images/logo.png', height: 60),
            const SizedBox(width: 10),
            Text(caregiver.name),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(caregiver.name, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            Text('${caregiver.distance} • ⭐ ${caregiver.rating}', style: const TextStyle(fontSize: 18, color: Colors.grey)),
            const SizedBox(height: 20),
            Text(caregiver.description, textAlign: TextAlign.center, style: const TextStyle(fontSize: 16)),
            const SizedBox(height: 40),
            _buildButton(Icons.category, 'Tipo de serviço', () => _selecionarServico(context)),
            const SizedBox(height: 10),
            _buildButton(Icons.more_horiz, 'Mais opções', () => _mostrarMaisOpcoes(context)),
            const SizedBox(height: 10),
            _buildOutlineButton(Icons.cancel, 'Cancelar agendamento', () => _confirmarCancelamento(context)),
          ],
        ),
      ),
    );
  }

  Widget _buildButton(IconData icon, String label, VoidCallback onPressed) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton.icon(onPressed: onPressed, icon: Icon(icon), label: Text(label)),
    );
  }

  Widget _buildOutlineButton(IconData icon, String label, VoidCallback onPressed) {
    return SizedBox(
      width: double.infinity,
      child: OutlinedButton.icon(
        onPressed: onPressed,
        icon: Icon(icon, color: Colors.red),
        label: Text(label, style: const TextStyle(color: Colors.red)),
      ),
    );
  }
}
