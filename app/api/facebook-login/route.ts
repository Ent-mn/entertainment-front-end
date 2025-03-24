import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const requestBody = await req.json();

    // Construct the Facebook Graph API URL
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${requestBody.userId}/?fields=id,name,picture,email&access_token=${requestBody.accessToken}`;

    // Make the API request to Facebook Graph API
    const response = await fetch(urlGraphFacebook);
    const data = await response.json();

    console.log(data);

    // Check if there was an error or if the data is missing
    if (response.status !== 200 || !data || data.error) {
      console.error("Facebook API Error: ", data.error || "Unknown error");
      return new Response("Facebook authentication failed. Please try again.", {
        status: 400,
      });
    }

    // Example of saving the data into a database (you can integrate MongoDB/PostgreSQL here)
    // Uncomment and integrate your database logic below
    /*
    const user = {
      facebookId: data.id,
      name: data.name,
      email: data.email,
      profilePicture: data.picture?.data?.url,
    };

    // Save user to database
    const savedUser = await saveUserToDatabase(user);
    */

    // Return success response if everything went well
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error during Facebook login:", error);
    return new Response("An error occurred during Facebook login.", {
      status: 500,
    });
  }
}

// Placeholder function to simulate saving user to the database (MongoDB/PostgreSQL integration)
async function saveUserToDatabase(user: any) {
  // Replace this with actual database logic (MongoDB, PostgreSQL, etc.)
  // Example:
  // const savedUser = await db.collection("users").insertOne(user);
  return user; // Just returns the user for now
}
