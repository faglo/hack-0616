import { Navbar } from "@/components"
import { Map } from "@/screens"
import { Route } from "wouter";
import HomeIcon from '@mui/icons-material/HomeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { useLocation } from "wouter";

function App() {
  const avatarURL = 'https://s3-alpha-sig.figma.com/img/281b/0b49/964720a17109c22857c8b5e3a5637600?Expires=1687737600&Signature=GWINJwmrW6z9a3vLFwh16VNivwgeqYrnI2hb42~DKFntF7sQ973gNQcbwiPmTCmDik8bV7wLwP-NunOtRYLilX6t5vSRtsdGnkuo8fRTtSWjyaIPD7KQ99V0PIOFSS5Y~e9sHPGDVj2mXIGkWO1OcwjiZcx64tyiPA1odNDg1Wb0SdPanjSNGVZXq96RUWh-QdKxoSIli~KgwUGgIZrnYIjopPmezGOwGQyll~hY93ajq8TkYuFpqUnqLvVN3KE6J1AIXgzFEFQYkdT5HlO5y2zMnKMS3U91M~uZbM6ZxMEGVg0cUMX9cVSsVyO-8mJCE8HfMMap1CPXomq7kXTd7A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
  const [location] = useLocation()
  const getIconStyles = (selected: boolean) => ({
    color: selected ? 'black' : 'white',
    background: selected ? '#C9FF32' : 'transparent',
    padding: '12px',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  })

  return (
    <div>
      <Navbar
        title="My App"
        links={[
            { 
              label: "Home", 
              url: "/", 
              icon: <HomeIcon 
                fontSize="large"
                style={getIconStyles(location === "/")}
              /> 
            },
            { 
              label: "Apps", 
              url: "/apps",
              icon: <GridViewRoundedIcon 
                fontSize="large"
                style={getIconStyles(location === '/apps')}
              /> 
          },
          { 
            label: "Settings", 
            url: "/settings", 
            icon: <SettingsRoundedIcon 
              fontSize="large"
              style={getIconStyles(location === "/settings")}
            /> 
          },
          {
            label: "Map",
            url: "/map",
            icon: <LocationOnRoundedIcon
              fontSize="large"
              style={getIconStyles(location === "/map")}
            />
          }
        ]}
        avatar={avatarURL}
      >
        <Route path="/">
          <h1>Home</h1>
        </Route>
        <Route path="/about">
          <h1>About</h1>
        </Route>
        <Route path="/contact">
          <h1>Contact</h1>
        </Route>
        <Route path="/map">
          <Map/>
        </Route>
      </Navbar>
    </div>
  )
}

export default App
