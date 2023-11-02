export default function useAuth () {
  // const [session, setSession] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
    // setLoading(false);
  // }, []);

  const register = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json'
        },
      });
    
      if (res.ok) {
        const session = await res.json();
        return session;
      } 
    } catch (error) {
     console.log(error);
    }
  }

  const login = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signin`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json'
        },
      })

       if (res.ok) {
        const session = await res.json();
        return session;
      } 
    } catch (err) {
      console.log(err);
    }
  }

  const logout = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`, {
      credentials: 'include'
      })

      if (res.ok) return true
      } catch (err) {
        console.log(err);
      }

    }
  return {register, login, logout}
}