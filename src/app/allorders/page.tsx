import getUserOrders from '@/paymentAction/getAllOrders.action'
import { CalendarDays, CheckCircle2, CreditCard, Package, Truck } from 'lucide-react'

export default async function AllOrders() {
  const response = await getUserOrders()
  const orders = Array.isArray(response) ? response : response?.data ?? []

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
    }).format(new Date(date))

  const formatPrice = (price: number) =>
    `${new Intl.NumberFormat('en-US').format(price)} EGP`

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col justify-between gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
              Account overview
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My orders
            </h1>
            <p className="mt-2 text-slate-500">
              Follow your purchases from payment to delivery.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:self-auto">
            <Package className="size-5 text-green-600" />
            <span className="text-sm font-semibold text-slate-700">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </span>
          </div>
        </header>

        {orders.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Package className="mx-auto mb-4 size-10 text-slate-300" />
            <h2 className="text-xl font-semibold text-slate-800">No orders yet</h2>
            <p className="mt-2 text-slate-500">Your completed purchases will appear here.</p>
          </section>
        ) : (
          <div className="space-y-5">
            {orders.map((order: any) => (
              <article key={order._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-5 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                  <div className="grid gap-4 sm:grid-cols-3 sm:gap-8">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Order placed</p>
                      <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <CalendarDays className="size-4 text-green-600" />
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total</p>
                      <p className="mt-1 text-sm font-bold text-slate-900">{formatPrice(order.totalOrderPrice)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Order ID</p>
                      <p className="mt-1 max-w-36 truncate text-sm font-medium text-slate-700" title={order._id}>
                        #{order._id?.slice(-8)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${order.isPaid ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      <CreditCard className="size-3.5" />
                      {order.isPaid ? 'Paid' : 'Payment pending'}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${order.isDelivered ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                      {order.isDelivered ? <CheckCircle2 className="size-3.5" /> : <Truck className="size-3.5" />}
                      {order.isDelivered ? 'Delivered' : 'Processing'}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 px-5 sm:px-7">
                  {(order.cartItems ?? []).map((item: any) => (
                    <div key={item._id} className="flex items-center gap-4 py-4">
                      <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        <img src={item.product?.imageCover} alt={item.product?.title ?? 'Product'} className="size-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-slate-800">{item.product?.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">Quantity: {item.count}</p>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{formatPrice(item.price * item.count)}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
