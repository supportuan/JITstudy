import { Link } from "react-router-dom";
import { GlassAuthCard, GlassField } from "../components/GlassAuthCard";
import { SiteHeader } from "../components/SiteHeader";
import { VideoBackgroundLayout } from "../components/VideoBackgroundLayout";

export function RegisterPage() {
  return (
    <VideoBackgroundLayout header={<SiteHeader showNav={false} />}>
      <div className="flex h-full min-h-0 items-center justify-center overflow-hidden px-4 pt-20 pb-12">
        <GlassAuthCard
          title="Register"
          submitLabel="Register"
          onSubmit={(event) => event.preventDefault()}
          footer={
            <>
              already a user -{" "}
              <Link
                to="/login"
                className="font-medium text-white underline underline-offset-2"
              >
                login
              </Link>
            </>
          }
        >
          <GlassField
            label="Name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Enter your full name"
          />
          <GlassField
            label="Email ID"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
          />
          <GlassField
            label="Phone number"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="Enter your phone number"
          />
          <GlassField
            label="Password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="Create a password"
          />
        </GlassAuthCard>
      </div>
    </VideoBackgroundLayout>
  );
}
