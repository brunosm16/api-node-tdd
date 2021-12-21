# Sign Up

### 👍 Casos de Sucesso
-----------------

1. ✅ Recebe uma requisição do tipo POST tendo como parâmetros name, email, password, passwordConfirm. A rota de requisição é a **/api/signup**
2. ✅ Realiza a validação dos campos passados na requisição de POST.
3. ✅ Valida se a senha(password) e a confirmação de senha(passwordConfirm) estão iguais.
4. ✅ Realiza a criptografia da senha(password) passada na requisição. E salva essa senha criptografada no Banco.
5. ✅ Após a inserção do usuário no POST é retornado um código 200 tendo como o body o usuário inserido. 

### 👍 Casos de Exceções 
-----------------

1. ✅ Retorna erro 404 se os valores passados na requisição (name, email, password, passwordConfirm) não forem fornecidos.
2. ✅ Retorna erro 404 se a senha(password) e a confirmação de senha(passwordConfirm) não estiverem iguais.
3. ✅ Retorna erro 404 se o e-mail passado na requisição for inválido.
4. ✅ Retorna erro 500 se houver erro ao tentar criar um usuário. 
