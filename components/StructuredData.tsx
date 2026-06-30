import {
  personSchema,
  profilePageSchema,
  websiteSchema,
} from "@/lib/structured-data"
import JsonLd from "@/components/JsonLd"

export default function StructuredData() {
  return <JsonLd data={[personSchema(), websiteSchema(), profilePageSchema()]} />
}
