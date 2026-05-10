import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Hash,
  Mail,
  Code2,
  Terminal,
  ChefHat,
} from "lucide-react";

import RegistrationInput from "./RegistrationInput";
import RegistrationSelect from "./RegistrationSelect";
import RegistrationActions from "./RegistrationActions";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    uniqueUsername: "",
    year: "1st Year",
    gmail: "",
    leetcode: "",
    codeforces: "",
    codechef: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Create the user
      const userResponse = await fetch("/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          branch: "Unknown", // Default branch as it's not in the form
        }),
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to register user");
      }

      const userData = await userResponse.json();

      // 2. Add to leaderboard & auto-calculate score
      const leaderboardResponse = await fetch("/api/leaderboard/auto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData._id,
          codeforces: formData.codeforces,
          leetcode: formData.leetcode,
          codechef: formData.codechef,
        }),
      });

      if (!leaderboardResponse.ok) {
        throw new Error("Failed to add user to leaderboard");
      }

      // 3. Redirect to leaderboard
      navigate("/");
    } catch (error) {
      alert(error.message || "An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="
        bg-white/[0.03]
        border border-yellow-500/10
        rounded-2xl
        p-4
        backdrop-blur-xl
        flex flex-col
        gap-4
      "
    >

      <RegistrationInput
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        icon={User}
        placeholder="John Doe"
        required
      />

      <RegistrationInput
        label="Roll Number"
        name="uniqueUsername"
        value={formData.uniqueUsername}
        onChange={handleChange}
        icon={Hash}
        placeholder="21BCE1000"
        required
      />

      <RegistrationSelect
        label="Year"
        name="year"
        value={formData.year}
        onChange={handleChange}
        options={[
          "1st Year",
          "2nd Year",
          "3rd Year",
          "4th Year",
        ]}
      />

      <RegistrationInput
        label="Email"
        name="gmail"
        type="email"
        value={formData.gmail}
        onChange={handleChange}
        icon={Mail}
        placeholder="john@gmail.com"
        required
      />

      <RegistrationInput
        label="Leetcode"
        name="leetcode"
        value={formData.leetcode}
        onChange={handleChange}
        icon={Code2}
        placeholder="leetcode_handle"
      />

      <RegistrationInput
        label="Codeforces"
        name="codeforces"
        value={formData.codeforces}
        onChange={handleChange}
        icon={Terminal}
        placeholder="cf_handle"
      />

      <RegistrationInput
        label="CodeChef"
        name="codechef"
        value={formData.codechef}
        onChange={handleChange}
        icon={ChefHat}
        placeholder="cc_handle"
      />

      <RegistrationActions isLoading={isLoading} />

    </form>
  );
}