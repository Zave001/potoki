#!/bin/bash
# Скрипт деплоя потоков на Linux VM
# Запускать из корня проекта: bash nginx/deploy.sh

set -e

DOMAIN=${1:-"localhost"}
STATIC_DIR="/var/www/potoki"
SSL_DIR="/etc/nginx/ssl"
CONF_SRC="$(dirname "$0")/potoki.conf"
CONF_DST="/etc/nginx/sites-available/potoki"

echo "==> Сборка React-приложения..."
npm run build

echo "==> Копирование статики в $STATIC_DIR..."
sudo mkdir -p "$STATIC_DIR"
sudo rsync -a --delete dist/ "$STATIC_DIR/"
sudo chown -R www-data:www-data "$STATIC_DIR"
sudo chmod -R 755 "$STATIC_DIR"

# ── SSL-сертификат ───────────────────────────
sudo mkdir -p "$SSL_DIR"

if [ ! -f "$SSL_DIR/potoki.crt" ]; then
    echo "==> Генерация самоподписанного сертификата (замени на реальный для прода)..."
    sudo openssl req -x509 -nodes -days 365 -newkey rsa:4096 \
        -keyout "$SSL_DIR/potoki.key" \
        -out    "$SSL_DIR/potoki.crt" \
        -subj   "/CN=$DOMAIN/O=Potoki/C=RU" \
        -addext "subjectAltName=DNS:$DOMAIN,IP:127.0.0.1"
    sudo chmod 600 "$SSL_DIR/potoki.key"
    sudo chmod 644 "$SSL_DIR/potoki.crt"
fi

# ── nginx конфиг ────────────────────────────
echo "==> Установка nginx конфига..."
sudo cp "$CONF_SRC" "$CONF_DST"
sudo ln -sf "$CONF_DST" /etc/nginx/sites-enabled/potoki

# ── Firewall (ufw) ───────────────────────────
if command -v ufw &>/dev/null; then
    echo "==> Настройка ufw..."
    sudo ufw allow 6565/tcp comment "potoki HTTP"
    sudo ufw allow 6464/tcp comment "potoki HTTPS"
    # Закрываем стандартные 80/443 если не нужны
    # sudo ufw deny 80/tcp
    # sudo ufw deny 443/tcp
fi

echo "==> Проверка конфига nginx..."
sudo nginx -t

echo "==> Перезапуск nginx..."
sudo systemctl reload nginx

echo ""
echo "Готово!"
echo "  HTTP  → http://$DOMAIN:6565"
echo "  HTTPS → https://$DOMAIN:6464"
