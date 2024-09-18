import IconCloud from '@/components/magicui/icon-cloud'

const slugs = [
  'apple',
  'amazon',
  'nvidia',
  'tesla',
  'threem',
  'amd',
  'adobe',
  'snapchat',
  'google',
  'microsoft',
  'uber',
  'bitcoin',
  'goldmansachs',
  'cocacola',
  'att',
  'ford',
  'algorand',
  'disney',
  'netflix',
  'spotify',
  'nike',
  'adidas',
  'puma',
  'reebok',
  'underarmour',
  'lululemon',
  'airbnb',
  'lyft',
  'pinterest',
  'tiktok',
  'twitter',
  'facebook',
  'instagram',
  'linkedin',
]

export function HumblPortfolioCloud() {
  return (
    <div className="w-full h-full pointer-events-none">
      <IconCloud iconSlugs={slugs} />
    </div>
  )
}
