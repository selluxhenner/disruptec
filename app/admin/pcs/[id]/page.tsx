import { PCForm } from "@/components/admin/pc-form"

export default async function EditPCPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <PCForm pcId={id} />
}
