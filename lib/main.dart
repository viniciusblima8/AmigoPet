import 'package:flutter/material.dart';
import 'pages/caregiver_list_page.dart';
import 'styles/app_theme.dart';

void main() {
  runApp(const AmigoPetApp());
}

class AmigoPetApp extends StatelessWidget {
  const AmigoPetApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AmigoPet',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const CaregiverListPage(),
    );
  }
}
