import Image from "next/image";
import Balancer from "react-wrap-balancer";

function LandingIntroPhotographer() {
    return (
        <div className="hero min-h-full rounded-l-xl bg-base-200">
            <div className="hero-content py-12">
                <div className="max-w-md">
                    <h1 className="text-3xl content-center font-bold ">
                        <Image
                            src="/images/logo-red.png"
                            width={300}
                            height={48.7}
                            className="mx-auto"
                            alt="FotoEventos"
                        />
                    </h1>

                    <div className="text-center mt-12">
                        <Image
                            src="/images/intro.png"
                            width={192}
                            height={192}
                            alt="FotoEventos"
                            className="w-48 inline-block"
                        />
                    </div>

                    <h2 className="text-xl mt-8 font-bold">
                        <Balancer>
                            la manera más sencilla de compartir y vender tus imágenes con el mundo
                        </Balancer>
                    </h2>
                    <p className="py-2 mt-4">
                        ✓ <span className="font-semibold">Light/dark</span> mode toggle
                    </p>
                    <p className="py-2 ">
                        ✓ <span className="font-semibold">Redux toolkit</span> and other utility
                        libraries configured
                    </p>
                    <p className="py-2  ">
                        ✓ User-friendly <span className="font-semibold">documentation</span>
                    </p>
                    <p className="py-2  mb-4">
                        ✓ <span className="font-semibold">Daisy UI</span> components,{" "}
                        <span className="font-semibold">Tailwind CSS</span> support
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LandingIntroPhotographer;
