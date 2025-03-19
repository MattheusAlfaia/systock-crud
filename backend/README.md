# Systock Crud

## Setup
1. Clone o repositório
```bash
git clone https://github.com/MattheusAlfaia/systock-crud
```

2. Instalar as dependências
```bash
composer install
```
3. Criar o arquivo .env
```bash
cp .env.example .env
```

4. Gerar a chave da aplicação
```bash
php artisan key:generate
```

6. Executar as migrations
```bashq
php artisan migrate
```

7. Gerar o token do jwt
```bash
php artisan jwt:secret
```

8. Executar o servidor
```bash
php artisan serve
```

## Populando o banco de dados
1. Inserir users no banco de dados
```bash
php artisan db:seed
```

2. Para realizar o login, utilize as credenciais abaixo:
```bash
usuario: admin@email.com
senha: Secret123
```