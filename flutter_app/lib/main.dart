import 'dart:io';
import 'package:flutter/material.dart';
import 'package:google_generative_ai/google_generative_ai.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter_markdown/flutter_markdown.dart';

void main() {
  runApp(const AgriSmartApp());
}

class AgriSmartApp extends StatelessWidget {
  const AgriSmartApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AgriSmart Assistant',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.green),
        useMaterial3: true,
        fontFamily: 'Inter',
      ),
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;

  static final List<Widget> _pages = <Widget>[
    const HomeScreen(),
    const DiagnosisScreen(),
    const MarketScreen(),
    const ChatScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(index: _selectedIndex, children: _pages),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (int index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        destinations: const <NavigationDestination>[
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.local_hospital_outlined),
            selectedIcon: Icon(Icons.local_hospital),
            label: 'Doctor',
          ),
          NavigationDestination(icon: Icon(Icons.trending_up), label: 'Market'),
          NavigationDestination(
            icon: Icon(Icons.chat_bubble_outline),
            selectedIcon: Icon(Icons.chat_bubble),
            label: 'Assistant',
          ),
        ],
      ),
    );
  }
}

// --- 1. HOME SCREEN ---
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('AgriSmart'), centerTitle: true),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.green.shade50,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                children: [
                  Text(
                    'Smart Farming',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: Colors.green.shade900,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Your AI companion for better harvests',
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            _buildFeatureCard(
              context,
              Icons.camera_alt,
              'Crop Doctor',
              'Identify diseases instantly',
              Colors.green,
            ),
            const SizedBox(height: 12),
            _buildFeatureCard(
              context,
              Icons.show_chart,
              'Market Insights',
              'Check prices & trends',
              Colors.blue,
            ),
            const SizedBox(height: 12),
            _buildFeatureCard(
              context,
              Icons.smart_toy,
              'Assistant',
              'Chat with AI expert',
              Colors.indigo,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFeatureCard(
    BuildContext context,
    IconData icon,
    String title,
    String subtitle,
    Color color,
  ) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: Colors.grey.shade200),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.all(16),
        leading: CircleAvatar(
          backgroundColor: color.withOpacity(0.1),
          child: Icon(icon, color: color),
        ),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle),
      ),
    );
  }
}

// --- 2. DIAGNOSIS SCREEN (Vision) ---
class DiagnosisScreen extends StatefulWidget {
  const DiagnosisScreen({super.key});

  @override
  State<DiagnosisScreen> createState() => _DiagnosisScreenState();
}

class _DiagnosisScreenState extends State<DiagnosisScreen> {
  File? _image;
  String? _result;
  bool _isLoading = false;
  final ImagePicker _picker = ImagePicker();

  Future<void> _analyzeImage() async {
    if (_image == null) return;
    setState(() {
      _isLoading = true;
      _result = null;
    });

    try {
      // NOTE: In a real app, use the API key passed from main or env
      final model = GenerativeModel(
        model: 'gemini-2.5-flash',
        apiKey: 'YOUR_API_KEY',
      );
      final imageBytes = await _image!.readAsBytes();
      final prompt = TextPart(
        "Analyze this crop image. Identify the plant, diseases, and provide treatment.",
      );
      final imagePart = DataPart('image/jpeg', imageBytes);

      final response = await model.generateContent([
        Content.multi([prompt, imagePart]),
      ]);

      setState(() {
        _result = response.text;
      });
    } catch (e) {
      setState(() {
        _result = "Error analyzing image: $e";
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _pickImage(ImageSource source) async {
    final XFile? pickedFile = await _picker.pickImage(source: source);
    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path);
        _result = null;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Crop Doctor')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Container(
            height: 250,
            decoration: BoxDecoration(
              color: Colors.grey.shade100,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.grey.shade300),
            ),
            child: _image != null
                ? ClipRRect(
                    borderRadius: BorderRadius.circular(16),
                    child: Image.file(_image!, fit: BoxFit.cover),
                  )
                : Center(
                    child: Icon(
                      Icons.add_a_photo,
                      size: 50,
                      color: Colors.grey.shade400,
                    ),
                  ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: FilledButton.icon(
                  onPressed: () => _pickImage(ImageSource.camera),
                  icon: const Icon(Icons.camera),
                  label: const Text("Camera"),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () => _pickImage(ImageSource.gallery),
                  icon: const Icon(Icons.photo_library),
                  label: const Text("Gallery"),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          if (_image != null)
            FilledButton(
              onPressed: _isLoading ? null : _analyzeImage,
              style: FilledButton.styleFrom(
                backgroundColor: Colors.green.shade700,
                padding: const EdgeInsets.all(16),
              ),
              child: _isLoading
                  ? const CircularProgressIndicator(color: Colors.white)
                  : const Text("Diagnose Disease"),
            ),
          if (_result != null) ...[
            const SizedBox(height: 24),
            const Text(
              "Diagnosis Result:",
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            const Divider(),
            MarkdownBody(data: _result!),
          ],
        ],
      ),
    );
  }
}

// --- 3. MARKET SCREEN (Search Grounding) ---
class MarketScreen extends StatefulWidget {
  const MarketScreen({super.key});

  @override
  State<MarketScreen> createState() => _MarketScreenState();
}

class _MarketScreenState extends State<MarketScreen> {
  final TextEditingController _controller = TextEditingController();
  String? _result;
  bool _isLoading = false;

  Future<void> _searchMarket() async {
    if (_controller.text.isEmpty) return;
    setState(() {
      _isLoading = true;
      _result = null;
    });

    try {
      final model = GenerativeModel(
        model: 'gemini-2.0-flash-exp',
        apiKey: 'YOUR_API_KEY',
      );
      final response = await model.generateContent([
        Content.text(_controller.text),
      ]);
      setState(() {
        _result = response.text;
      });
    } catch (e) {
      setState(() {
        _result = "Error fetching market data: $e";
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Market Insights')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: _controller,
              decoration: InputDecoration(
                hintText: 'e.g., Wheat prices in Kansas',
                suffixIcon: IconButton(
                  icon: const Icon(Icons.search),
                  onPressed: _searchMarket,
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
            ),
            const SizedBox(height: 20),
            if (_isLoading) const CircularProgressIndicator(),
            if (_result != null)
              Expanded(
                child: SingleChildScrollView(
                  child: MarkdownBody(data: _result!),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

// --- 4. CHAT SCREEN ---
class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final List<Content> _history = [];
  final TextEditingController _controller = TextEditingController();
  late final ChatSession _chat;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    final model = GenerativeModel(
      model: 'gemini-2.5-flash',
      apiKey: 'YOUR_API_KEY',
      systemInstruction: Content.text('You are a helpful farming assistant.'),
    );
    _chat = model.startChat(history: _history);
  }

  Future<void> _sendMessage() async {
    if (_controller.text.isEmpty) return;
    final userMsg = _controller.text;
    setState(() {
      _history.add(Content.text(userMsg));
      _isLoading = true;
      _controller.clear();
    });

    try {
      final response = await _chat.sendMessage(Content.text(userMsg));
      setState(() {
        if (response.text != null) {
          // Note: In real app, manage local history better for display
        }
      });
    } catch (e) {
      // Handle error
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    // Simplified chat UI for brevity
    return Scaffold(
      appBar: AppBar(title: const Text('Assistant')),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: _chat.history.length,
              itemBuilder: (context, index) {
                final msg = _chat.history.toList()[index];
                final isUser = msg.role == 'user';
                return Align(
                  alignment: isUser
                      ? Alignment.centerRight
                      : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.all(8),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isUser
                          ? Colors.green.shade100
                          : Colors.grey.shade200,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(msg.parts.whereType<TextPart>().first.text),
                  ),
                );
              },
            ),
          ),
          if (_isLoading) const LinearProgressIndicator(),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      hintText: 'Ask anything...',
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: _sendMessage,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
