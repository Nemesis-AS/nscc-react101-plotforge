import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function App() {
    const [promptText, setPromptText] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setLoading] = useState(false);

    const fetchResponse = async () => {
        setLoading(true);
        const prompt = `I want you to act as a novelist. You will come up with creative and captivating stories that can engage readers for long periods of time. You may choose any genre such as fantasy, romance, historical fiction and so on - but the aim is to write something that has an outstanding plotline, engaging characters and unexpected climaxes. My first request is "${promptText}"`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    };

    return (
        <main>
            <h1 className="text-2xl text-center font-bold py-4">
                Story Generator
            </h1>
            <section className="max-w-4xl mx-auto bg-slate-200 px-4">
                <div className="flex flex-col py-4">
                    <label htmlFor="promptText" className="text-lg">
                        Enter prompt:
                    </label>
                    <textarea
                        name="promptText"
                        id="promptText"
                        cols="30"
                        rows="5"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        value={promptText}
                        onInput={(e) => setPromptText(e.target.value)}
                    ></textarea>
                </div>

                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    onClick={fetchResponse}
                >
                    Submit
                </button>
            </section>

            <section className="max-w-4xl mx-auto p-4">
                {isLoading ? (
                    <div className="flex items-center justify-center w-full text-xl font-bold pt-8">
                        <div
                            role="status"
                            className="flex items-center justify-center flex-col gap-2"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span>Generating Story...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <h4 className="text-xl font-bold py-2">
                            {response === ""
                                ? ""
                                : "Here is your generated story:"}
                        </h4>
                        <article className="text-lg">
                            {response.split(/(?:\r?\n)+/).map((para, idx) => (
                                <p key={idx} className="text-lg py-2">
                                    {para}
                                </p>
                            ))}
                        </article>
                    </>
                )}
            </section>
        </main>
    );
}

export default App;
