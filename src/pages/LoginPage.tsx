import { Link } from "react-router-dom";
import { GlassAuthCard, GlassField } from "../components/GlassAuthCard";
import { SiteHeader } from "../components/SiteHeader";
import { VideoBackgroundLayout } from "../components/VideoBackgroundLayout";

export function LoginPage() {
  return (
    <VideoBackgroundLayout header={<SiteHeader showNav={false} />}>
      <div className="flex h-full min-h-0 items-center justify-center overflow-hidden px-4 pt-20 pb-12">
        <GlassAuthCard
          title="Login"
          submitLabel="Login"
          onSubmit={(event) => event.preventDefault()}
          footer={
            <>
              New to page{" "}
              <Link
                to="/register"
                className="font-medium text-white underline underline-offset-2"
              >
                register
              </Link>
            </>
          }
        >
          <GlassField
            label="Login ID"
            name="loginId"
            type="text"
            required
            autoComplete="username"
            placeholder="Enter your login ID"
          />
          <GlassField
            label="Password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </GlassAuthCard>
      </div>
    </VideoBackgroundLayout>
  );
}
