# Student Memory App dla Studentów - Dokumentacja Projektu

## Wprowadzenie

Student Memory App to aplikacja zaprojektowana z myślą o studentach, która pozwala na tworzenie i zarządzanie notatkami z zadaniami. Każda notatka może zawierać tytuł, opis, priorytet, miniaturę oraz treść. Aplikacja oferuje również motywacyjne cytaty, które mają zachęcić do efektywnej nauki i pracy.

## Wymagania

Aby uruchomić aplikację na swoim komputerze, będziesz potrzebować:
- Node.js (wersja 14 lub nowsza)
- Git

## Instalacja

### Krok 1: Zainstaluj Node.js

Node.js to środowisko wykonawcze dla JavaScript, które umożliwia uruchamianie kodu JavaScript poza przeglądarką. Jest to wymagane, aby uruchomić serwer aplikacji oraz zainstalować potrzebne pakiety. 

Jeśli nie masz jeszcze zainstalowanego Node.js, możesz go pobrać i zainstalować ze strony: [Node.js](https://nodejs.org/).

### Krok 2: Zainstaluj Git

Git to system kontroli wersji, który umożliwia zarządzanie kodem źródłowym projektu. Dzięki Git możesz łatwo pobrać (sklonować) repozytorium projektu na swój komputer oraz śledzić zmiany w kodzie.

Aby zainstalować Git, przejdź na stronę: [Git](https://git-scm.com/) i postępuj zgodnie z instrukcjami instalacji odpowiednimi dla Twojego systemu operacyjnego.

### Krok 3: Sklonuj repozytorium

Aby pobrać kod aplikacji, musisz sklonować repozytorium, czyli stworzyć lokalną kopię projektu na swoim komputerze. Otwórz terminal i wpisz:

> git clone https://github.com/twoje-repozytorium/todo-app.git

### Krok 4: Przejdź do katalogu projektu

Po sklonowaniu repozytorium, przejdź do katalogu, w którym znajduje się projekt. To pozwoli Ci uruchomić polecenia dotyczące projektu wewnątrz tego katalogu.

> cd todo-app

### Krok 5: Zainstaluj pakiety npm

npm (Node Package Manager) to menedżer pakietów dla Node.js. Umożliwia on instalację bibliotek i narzędzi potrzebnych do uruchomienia projektu.

Zainstaluj wszystkie potrzebne pakiety używając npm:

> npm install

## Uruchomienie aplikacji

Po zainstalowaniu wszystkich pakietów, możesz uruchomić aplikację. W terminalu wpisz:

> npm run dev

Polecenie to uruchomi serwer deweloperski, który umożliwia podgląd aplikacji na żywo podczas jej tworzenia. Aplikacja powinna teraz działać i być dostępna pod adresem np.[http://localhost:3000](http://localhost:3000) w Twojej przeglądarce internetowej.

## Korzyści z korzystania z aplikacji

- **Organizacja pracy**: Aplikacja pozwala na łatwe tworzenie i zarządzanie zadaniami, co pomaga w lepszej organizacji pracy i zwiększeniu produktywności.
- **Motywacja**: Wbudowane motywacyjne cytaty mają na celu zachęcenie do działania i utrzymania wysokiego poziomu motywacji.
- **Priorytetyzacja zadań**: Możliwość ustawiania priorytetów dla zadań pozwala skupić się na najważniejszych obowiązkach.
- **Łatwość użycia**: Dzięki prostemu interfejsowi i lokalnej bazie danych, aplikacja jest łatwa do uruchomienia i użycia, bez potrzeby konfigurowania zewnętrznych serwerów.

## Jak skontrybuować do projektu

Chcesz pomóc w rozwoju Student Memory App? Świetnie! Poniżej znajdziesz kroki, które pomogą Ci zacząć.

### Krok 1: Sklonuj repozytorium

Jeśli jeszcze tego nie zrobiłeś, sklonuj repozytorium:

> git clone https://github.com/twoje-repozytorium/todo-app.git
> cd todo-app

### Krok 2: Stwórz nową gałąź

Zanim wprowadzisz jakiekolwiek zmiany, stwórz nową gałąź, aby łatwiej było śledzić Twoje zmiany:

> git checkout -b nazwa-twojej-galezi

### Przykład 1: Zmiana wyglądu przycisku

Chcesz zmienić wygląd przycisku w aplikacji? Oto jak to zrobić:

1. Otwórz plik `App.vue` w edytorze kodu.
2. Znajdź sekcję stylów (`<style scoped>`).
3. Dodaj nowe style lub zmodyfikuj istniejące.

Na przykład, aby zmienić kolor przycisku na niebieski:

> ```css
> button {
>   padding: 0.75rem;
>   background-color: blue;
>   color: white;
>   border: none;
>   border-radius: 4px;
>   font-size: 1rem;
>   cursor: pointer;
>   transition: background-color 0.3s;
> }
> 
> button:hover {
>   background-color: darkblue;
> }
> ```

### Przykład 2: Dodanie nowego prostego elementu

Chcesz dodać nowy element, np. sekcję z licznikiem zadań? Oto jak to zrobić:

1. Otwórz plik `HomeView.vue` w edytorze kodu.
2. Dodaj kod HTML dla nowego elementu w odpowiednim miejscu.

Na przykład, aby dodać licznik zadań:

> ```vue
> <template>
>   <div class="home">
>     <div class="todo-container">
>       <h2>To-Do List</h2>
>       <p>Liczba zadań: {{ todos.length }}</p>
>       <!-- Reszta kodu -->
>     </div>
>   </div>
> </template>
> 
> <script setup>
> import { ref, onMounted } from 'vue';
> import { useUserStore } from '../stores/user';
> 
> const todos = ref([]);
> const userStore = useUserStore();
> 
> const fetchTodos = () => {
>   todos.value = userStore.fetchTodos(userStore.user.id);
> };
> 
> onMounted(fetchTodos);
> </script>
> ```

3. Dodaj stylizację dla nowego elementu w sekcji `<style scoped>`.

> ```css
> p {
>   color: #ddd;
>   text-align: center;
> }
> ```

### Krok 3: Przetestuj zmiany

Przed wysłaniem swoich zmian upewnij się, że aplikacja działa poprawnie i że Twoje zmiany nie wprowadzają nowych błędów. 

### Krok 4: Wyślij swoje zmiany

Gdy już przetestujesz swoje zmiany, możesz je wysłać do repozytorium:

> git add .
> git commit -m "Opis zmian"
> git push origin nazwa-twojej-galezi

Następnie otwórz pull request na GitHubie, aby zgłosić swoje zmiany do recenzji.

## Struktura Projektu

### store/user.ts

Plik `user.ts` zawiera kod odpowiedzialny za zarządzanie stanem użytkowników oraz notatek (todos). Zawiera akcje takie jak logowanie, rejestracja, dodawanie i pobieranie notatek, oraz eksportowanie i importowanie bazy danych.

### HomeView.vue

`HomeView.vue` to strona główna aplikacji. Zawiera formularz do dodawania nowych notatek oraz listę wszystkich notatek użytkownika. Każda notatka może być wyświetlona wraz z tytułem, opisem, priorytetem, miniaturą oraz przyciskiem do wyświetlenia szczegółów.

### NoteView.vue

`NoteView.vue` to strona wyświetlająca szczegóły wybranej notatki. Zawiera pełną treść notatki, tytuł, opis, priorytet oraz miniaturę.

### App.vue

`App.vue` to główny plik aplikacji, który zarządza nawigacją oraz ogólnym wyglądem aplikacji. Zawiera przyciski nawigacyjne do logowania, rejestracji, wylogowania oraz kopiowania i importowania baz danych.

### LoginView.vue

`LoginView.vue` to strona logowania, która pozwala użytkownikowi zalogować się do aplikacji, podając adres e-mail oraz hasło.

### SignupView.vue

`SignupView.vue` to strona rejestracji, która pozwala nowym użytkownikom stworzyć konto w aplikacji, podając adres e-mail oraz hasło.

## Kopiowanie i importowanie baz danych

### Przycisk "Copy Users Database"

Przycisk ten kopiuje zawartość bazy danych użytkowników do schowka, umożliwiając łatwe przenoszenie danych między różnymi instancjami aplikacji.

### Przycisk "Copy Todos Database"

Przycisk ten kopiuje zawartość bazy danych notatek (bez miniatur) do schowka, umożliwiając łatwe przenoszenie danych między różnymi instancjami aplikacji.

### Przycisk "Upload Users Database"

Przycisk ten pozwala na zaimportowanie bazy danych użytkowników z pliku.

### Przycisk "Upload Todos Database"

Przycisk ten pozwala na zaimportowanie bazy danych notatek z pliku.
