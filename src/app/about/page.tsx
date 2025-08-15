export default function AboutPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-headline">About Us</h1>
        </div>
        <div className="prose dark:prose-invert lg:prose-xl mx-auto">
            <p>
                Welcome to tool.huzi.pk! We provide a collection of free, easy-to-use online tools to help you with your daily tasks.
            </p>
            <p>
                Our mission is to make simple utilities accessible to everyone without any cost. All our tools run directly in your browser, ensuring your data stays private and secure.
            </p>
        </div>
      </div>
    </div>
  );
}
