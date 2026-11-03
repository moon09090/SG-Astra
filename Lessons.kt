package com.line.ide.ui

import android.speech.tts.TextToSpeech
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.line.ide.ai.OpenRouterClient
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AiLanguageTeacherScreen(
    openRouterClient: OpenRouterClient,
    apiKey: String
) {
    val context = LocalContext.current
    var tts by remember { mutableStateOf<TextToSpeech?>(null) }
    var targetLanguage by remember { mutableStateOf("Spanish") }
    var userLevel by remember { mutableStateOf("Zero (Beginner)") }
    var aiResponse by remember { mutableStateOf("Welcome! Select your target language and level to begin your Zero-to-Hero AI Language Masterclass.") }
    var isLoading by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    DisposableEffect(context) {
        val textToSpeech = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                tts?.language = Locale.US
            }
        }
        tts = textToSpeech
        onDispose {
            textToSpeech.stop()
            textToSpeech.shutdown()
        }
    }

    val languages = listOf("Spanish", "French", "German", "Japanese", "Mandarin", "Italian", "Korean", "Russian")
    val levels = listOf("Zero (Beginner)", "Explorer (Elementary)", "Conversational (Intermediate)", "Fluent (Advanced)", "Hero (Mastery)")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(16.dp)
    ) {
        Text(
            text = "AI Language Teacher: Zero to Hero",
            style = MaterialTheme.colorScheme.headlineMedium.copy(fontWeight = FontWeight.Bold),
            color = MaterialTheme.colorScheme.primary
        )
        Spacer(modifier = Modifier.height(12.dp))

        // Vertical Premium Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Target Language", fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurface)
                Spacer(modifier = Modifier.height(8.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    languages.take(4).forEach { lang ->
                        FilterChip(
                            selected = targetLanguage == lang,
                            onClick = { targetLanguage = lang },
                            label = { Text(lang, fontSize = 12.sp) }
                        )
                    }
                }
                Spacer(modifier = Modifier.height(12.dp))
                Text("Proficiency Level", fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurface)
                Spacer(modifier = Modifier.height(8.dp))
                LazyColumn(
                    modifier = Modifier.height(110.dp),
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    items(levels) { lvl ->
                        Surface(
                            selected = userLevel == lvl,
                            onClick = { userLevel = lvl },
                            shape = RoundedCornerShape(8.dp),
                            color = if (userLevel == lvl) MaterialTheme.colorScheme.primary.copy(alpha = 0.2f) else MaterialTheme.colorScheme.surfaceVariant,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                text = lvl,
                                modifier = Modifier.padding(10.dp),
                                color = MaterialTheme.colorScheme.onSurface,
                                fontSize = 13.sp
                            )
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = {
                if (apiKey.isBlank()) {
                    aiResponse = "Please configure your API key."
                    return@Button
                }
                isLoading = true
                scope.launch(Dispatchers.IO) {
                    try {
                        val prompt = "Act as an expert AI language teacher. Teach $targetLanguage to a student currently at '$userLevel' level. Provide a structured lesson with vocabulary, grammar rule, and a practice dialogue with English translations."
                        val response = openRouterClient.generateResponse(apiKey, prompt)
                        aiResponse = response ?: "Failed to generate lesson."
                    } catch (e: Exception) {
                        aiResponse = "Error: ${e.localizedMessage}"
                    } finally {
                        isLoading = false
                    }
                }
            },
            modifier = Modifier.fillMaxWidth().height(50.dp),
            shape = RoundedCornerShape(12.dp)
        ) {
            if (isLoading) {
                CircularProgressIndicator(color = MaterialTheme.colorScheme.onPrimary, modifier = Modifier.size(24.dp))
            } else {
                Text("Generate Zero-to-Hero Lesson", fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Card(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text("Lesson Content & Voice Output", fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                    Button(
                        onClick = {
                            tts?.speak(aiResponse, TextToSpeech.QUEUE_FLUSH, null, null)
                        },
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text("🔊 Speak")
                    }
                }
                Spacer(modifier = Modifier.height(12.dp))
                Divider(color = MaterialTheme.colorScheme.surfaceVariant)
                Spacer(modifier = Modifier.height(12.dp))
                LazyColumn(
                    modifier = Modifier.fillMaxSize()
                ) {
                    item {
                        Text(
                            text = aiResponse,
                            color = MaterialTheme.colorScheme.onSurface,
                            fontSize = 14.sp
                        )
                    }
                }
            }
        }
    }
}
