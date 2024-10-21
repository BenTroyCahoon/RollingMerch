import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

// Typdefinition för feedback-data
interface Feedback {
  id: number;
  username: string;
  email: string;
  feedback: string;
  rating: number;
  created_at: string;
}

const FeedbackFormAndList: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    feedback: "",
    rating: 1,
  });
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hämta feedback när komponenten laddas
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("/feedback");
        if (!response.ok) {
          throw new Error("Misslyckades med att hämta feedback.");
        }
        const data = await response.json();
        setFeedbackList(data);
        setLoading(false);
      } catch (error) {
        setError("Det uppstod ett problem när feedbacken hämtades.");
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  // Hantera formulärinlämning
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Något gick fel när feedbacken skickades.");
      }

      // Ladda om feedbacklistan med den nya feedbacken
      const newFeedback = await response.json();
      setFeedbackList([newFeedback, ...feedbackList]); // Lägg till ny feedback högst upp

      // Återställ formuläret
      setFormData({ username: "", email: "", feedback: "", rating: 1 });
    } catch (error) {
      setError("Det uppstod ett problem. Försök igen senare.");
    }
  };

  // Hantera ändringar i formulärfälten
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  if (loading) {
    return <p>Laddar feedback...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Skicka Feedback</h2>
      <form onSubmit={handleSubmit}>
        {/* Feedbackformulär */}
        <div>
          <label htmlFor="username">Användarnamn (valfritt):</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">E-postadress:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="feedback">Feedback/Klagomål:</label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="rating">Betyg (1-5):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min={1}
            max={5}
            required
          />
        </div>

        <button type="submit">Skicka</button>
      </form>

      <h2>Feedbacklista</h2>
      <ul>
        {feedbackList.map((item) => (
          <li key={item.id}>
            <strong>{item.username || "Anonym"}</strong> (Betyg: {item.rating}
            /5)
            <p>{item.feedback}</p>
            <small>Skickad: {new Date(item.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackFormAndList;
