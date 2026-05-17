#!/bin/bash

# ============================================
# PT Renewa Green Energy — GitHub Push Script
# ============================================
# Jalankan: bash push-to-github.sh

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║   PT Renewa Green Energy — GitHub Setup  ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# --- INPUT USERNAME ---
read -p "GitHub username kamu: " GH_USER
if [ -z "$GH_USER" ]; then
  echo "❌ Username tidak boleh kosong."
  exit 1
fi

# --- INPUT REPO NAME ---
read -p "Nama repo GitHub (default: renewa-green): " REPO_NAME
REPO_NAME=${REPO_NAME:-renewa-green}

REMOTE_URL="https://github.com/${GH_USER}/${REPO_NAME}.git"

echo ""
echo "ℹ️  Remote URL: $REMOTE_URL"
echo ""

# --- CEK APAKAH REMOTE SUDAH ADA ---
if git remote get-url origin &>/dev/null; then
  echo "⚠️  Remote 'origin' sudah ada: $(git remote get-url origin)"
  read -p "Ganti dengan URL baru? (y/N): " REPLACE
  if [[ "$REPLACE" =~ ^[Yy]$ ]]; then
    git remote set-url origin "$REMOTE_URL"
    echo "✓ Remote diperbarui."
  fi
else
  git remote add origin "$REMOTE_URL"
  echo "✓ Remote ditambahkan."
fi

echo ""
echo "📦 Push ke GitHub..."
echo ""
echo "⚠️  Pastikan repo '${REPO_NAME}' sudah dibuat di:"
echo "   https://github.com/new"
echo ""
read -p "Sudah dibuat? Lanjut push? (y/N): " CONFIRM
if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
  git push -u origin main
  echo ""
  echo "✅ BERHASIL! Website Renewa sudah di GitHub:"
  echo "   https://github.com/${GH_USER}/${REPO_NAME}"
  echo ""
  echo "🚀 Deploy ke Vercel:"
  echo "   https://vercel.com/new → Import GitHub Repo → Deploy"
  echo ""
else
  echo "Push dibatalkan. Jalankan ulang setelah buat repo di GitHub."
fi
