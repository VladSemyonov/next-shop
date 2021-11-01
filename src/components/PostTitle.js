import Image from "next/image";
import Link from "next/link";

export default function PostTitle({ item }) {
  return (
    <div style={{ width: "30%" }} className="post-title">
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        <Image
          width={300}
          height={400}
          layout="responsive"
          style={{ width: "100%", height: "100%" }}
          alt={item.name._text}
          src={item.picture._text}
        />
        <div className="post-hidden">
          <div>
            <div>
              <span>March 17, 2017</span>
            </div>
            <h4>
              <Link
                href={{
                  pathname: "/product/[id]",
                  query: { id: item._attributes.id },
                }}
              >
                {item.name._text}
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
