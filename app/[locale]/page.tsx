import ContactPage from './contact/page';
import HomePage from './home/page';

export default function Main() {

  return (
    <div className="bg-(--bg-main-light) dark:bg-(--bg-main-dark) text-(--text-main-light) dark:text-(--text-main-dark) flex flex-col gap-8">
      {/* Section Home */}
      <div id="home">
        <HomePage />
      </div>

      {/* Section Contact */}
      <div id="contact">
        <ContactPage />
      </div>
    </div>
  );
}
