package com.line.ide.ui.theme

import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.ui.graphics.Color

object AppThemes {
    val ObsidianGold = darkColorScheme(
        primary = Color(0xFFD4AF37),
        onPrimary = Color(0xFF1A1A1A),
        secondary = Color(0xFFC5A059),
        background = Color(0xFF0F0F0F),
        surface = Color(0xFF181818),
        onBackground = Color(0xFFF3F3F3),
        onSurface = Color(0xFFE0E0E0),
        surfaceVariant = Color(0xFF222222)
    )

    val MidnightEmerald = darkColorScheme(
        primary = Color(0xFF50C878),
        onPrimary = Color(0xFF0A1F12),
        secondary = Color(0xFF3B9B5C),
        background = Color(0xFF0B130F),
        surface = Color(0xFF13221A),
        onBackground = Color(0xFFE8F5ED),
        onSurface = Color(0xFFD0E6D8),
        surfaceVariant = Color(0xFF1C3026)
    )

    val MinimalistPearl = lightColorScheme(
        primary = Color(0xFF2C2C2C),
        onPrimary = Color(0xFFFFFFFF),
        secondary = Color(0xFF666666),
        background = Color(0xFFFAFAFA),
        surface = Color(0xFFFFFFFF),
        onBackground = Color(0xFF1A1A1A),
        onSurface = Color(0xFF333333),
        surfaceVariant = Color(0xFFF0F0F0)
    )

    val SapphireNoir = darkColorScheme(
        primary = Color(0xFF3B82F6),
        onPrimary = Color(0xFF0F172A),
        secondary = Color(0xFF60A5FA),
        background = Color(0xFF090D16),
        surface = Color(0xFF111827),
        onBackground = Color(0xFFF8FAFC),
        onSurface = Color(0xFFE2E8F0),
        surfaceVariant = Color(0xFF1F2937)
    )
}
