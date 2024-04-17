## 💻 Requerimentos
* Para instalar e executar o Todolist é necessário o .NET Core 7.0.X instalado em sua máquina. Você pode obtê-lo <a href="https://dotnet.microsoft.com/en-us/download/dotnet" target="_blank">aqui.</a>
Após clonar o projeto, execute os seguintes comandos dentro da pasta raíz do .csproj:
  ```
  dotnet restore
  ```
  ```
  dotnet build
  ```
  ```
  dotnet run
  ```

## 📔 Gerando o Banco de Dados
* Crie e gerencie o banco de dados através das _migrations_;
* Execute os seguintes comandos dentro da pasta raíz do .csproj:
  
   ```
   dotnet ef migrations add InitialCreate
   ```
   ```
   dotnet ef database update
   ```
