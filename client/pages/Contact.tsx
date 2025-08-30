export default function Contact() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-brandSerif text-4xl md:text-5xl">Contact</h1>
        <p className="mt-2 text-foreground/70">
          We'd love to hear from you. Reach out using the details below.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border p-5">
            <h2 className="font-medium">Email</h2>
            <p className="mt-1 text-foreground/70">hello@aureole.com</p>
            <a href="mailto:hello@aureole.com" className="mt-3 inline-block text-sm underline">Send an email</a>
          </div>
          <div className="rounded-xl border p-5">
            <h2 className="font-medium">Phone</h2>
            <p className="mt-1 text-foreground/70">+1 (555) 123‑4567</p>
            <a href="tel:+15551234567" className="mt-3 inline-block text-sm underline">Call us</a>
          </div>
          <div className="rounded-xl border p-5 sm:col-span-2">
            <h2 className="font-medium">Location</h2>
            <p className="mt-1 text-foreground/70">123 Rue de Rivoli, 75001 Paris, France</p>
            <div className="mt-4 overflow-hidden rounded-lg border">
              <img
                src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg"
                alt="Map placeholder"
                className="h-56 w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
