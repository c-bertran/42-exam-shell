#ifndef __FT_MAP_HPP
# define __FT_MAP_HPP
# include "enable_if.hpp"
# include "iterator.hpp"

# include "map_iterator.hpp"

# include "miscellaneous.hpp"
# include "map_miscellaneous.hpp"
# include "nullptr_t.hpp"
# include "red_black_tree.hpp"
# include <memory>
# include <cstddef>
# include <stdexcept>
# include <limits>

namespace ft
{
/**
 * @tparam Key  	Key of node
 * @tparam T		Value type of node
 * @tparam Compare	Compare function, default to (x < y)
 * @tparam Alloc  	Allocator type, defaults to std::allocator<ft::pair<const Key, T>>
 * https://www.cplusplus.com/reference/map/map/
 */
template <class Key, class T, class Compare = ft::less<Key>, class Alloc = std::allocator<ft::pair<const Key, T> > >
class map
{
	#pragma region Member types
	public:
		typedef Key																key_type;
		typedef T																mapped_type;
		typedef ft::pair<const Key, T> 											value_type;
		typedef Compare															key_compare;
		typedef Alloc															allocator_type;
	public:
		class value_compare
		{
			friend class map<key_type, mapped_type, key_compare, allocator_type>;
			protected:
				Compare				comp;
				value_compare (Compare c) : comp(c) {}
			public:
				typedef bool 		result_type;
				typedef value_type	first_argument_type;
				typedef value_type	second_argument_type;
				bool operator() (const value_type& x, const value_type& y) const { return comp(x.first, y.first); }
		};
	public:
		typedef	typename allocator_type::reference								reference;
		typedef	typename allocator_type::const_reference						const_reference;
		typedef	typename allocator_type::pointer								pointer;
		typedef	typename allocator_type::const_pointer							const_pointer;
	private:
		typedef RBTnode<value_type>												_RBTnode;
		typedef _RBTnode														*NodePtr;
		typedef RBTree<value_type, key_compare>									_RBtree;
		typedef typename allocator_type::template rebind<_RBtree>::other		tree_allocator;
		typedef typename tree_allocator::pointer								tree_pointer;
	public:
		typedef ft::map_iterator<value_type, _RBTnode, _RBtree>					iterator;
		typedef ft::map_iterator<const value_type, _RBTnode, _RBtree>			const_iterator;
		typedef	ft::reverse_iterator<iterator>									reverse_iterator;
		typedef	ft::reverse_iterator<const_iterator>							const_reverse_iterator;
		typedef typename ft::iterator_traits<iterator>::difference_type			difference_type;
		typedef typename allocator_type::size_type								size_type;
	private:
		allocator_type															_Allocation;
		tree_allocator															_TreeAllocation;
		key_compare																_Compare;
		_RBtree																	*_Tree;
	#pragma endregion
	
	public:
		/**
		 * Transform iterator to const_iterator
		 */
		const_iterator &operator=(iterator it)
		{
			const_iterator const_it;
			const_it = *it;
			return (const_it);
		}
	#pragma region Constructor / Destructor
		explicit map(const key_compare& comp = key_compare(), const allocator_type & alloc = allocator_type()) : _Allocation(alloc), _Compare(comp)
		{
			_Tree = _TreeAllocation.allocate(1);
			_TreeAllocation.construct(_Tree, _RBtree());
		}

		template <typename InputIterator>
		map(InputIterator first, InputIterator last, const key_compare & comp = key_compare(), const allocator_type & alloc = allocator_type(), typename ft::enable_if<!ft::is_integral<InputIterator>::value, InputIterator>::type * = nullptr_t) : _Allocation(alloc), _Compare(comp)
		{
			_Tree = _TreeAllocation.allocate(1);
			_TreeAllocation.construct(_Tree, _RBtree());
			while (first != last)
			{
				_Tree->InsertNode(*first);
				first++;
			}
		}

		map(const map & x) : _Allocation(x._Allocation), _TreeAllocation(x._TreeAllocation)
		{
			const_iterator Start = x.begin();
			const_iterator End = x.end();
			_Tree = _TreeAllocation.allocate(1);
			_TreeAllocation.construct(_Tree, _RBtree());
			while (Start != End)
			{
				_Tree->InsertNode(ft::make_pair(Start->first, Start->second));
				Start++;
			}
		}

		map &operator=(const map & x)
		{
			if (this != &x)
			{
				_Tree->CleanTree();
				_TreeAllocation.destroy(_Tree);
				_TreeAllocation.deallocate(_Tree, 1);
				_Tree = NULL;
				const_iterator Start = x.begin();
				const_iterator End = x.end();
				_Tree = _TreeAllocation.allocate(1);
				_TreeAllocation.construct(_Tree, _RBtree());
				while (Start != End)
				{
					_Tree->InsertNode(ft::make_pair(Start->first, Start->second));
					Start++;
				}
			}
			return *this;
		}

		~map()
		{
			_Tree->CleanTree();
			_TreeAllocation.destroy(_Tree);
			_TreeAllocation.deallocate(_Tree, 1);
			_Tree = NULL;
		}
	#pragma endregion

	public:
	#pragma region Iterator
		iterator begin() { return iterator(_Tree->GetFirstNode(), _Tree); };
		const_iterator begin() const { return const_iterator(_Tree->GetFirstNode(), _Tree); }
		reverse_iterator rbegin() { return reverse_iterator(end()); }
		const_reverse_iterator rbegin() const { return const_reverse_iterator(end()); }
			
		iterator end() { return iterator(_Tree->GetTNULL(), _Tree); }
		const_iterator end() const { return const_iterator(_Tree->GetTNULL(), _Tree); }
		reverse_iterator rend() { return reverse_iterator(begin()); }
		const_reverse_iterator rend() const { return const_reverse_iterator(begin()); }
	#pragma endregion

	#pragma region Capacity
		bool empty() const { return _Tree->TreeIsEmpty(); }
		size_type size() const { return _Tree->GetSize(); }
		size_type max_size() const { return _Tree->GetMaxSize(); }
	#pragma endregion

	#pragma region Element access
		mapped_type& operator[] (const key_type& k)
		{
			iterator Itr = find(k);
			if (Itr == end())
				Itr = this->insert(ft::make_pair(k, mapped_type())).first;
			return Itr->second;
		}
	#pragma endregion

	#pragma region Modifiers
		ft::pair<iterator,bool> insert (const value_type& val)
		{ 
			bool isInsert = false;
			iterator Itr = find(val.first);
			if (Itr == end())
			{
				_Tree->InsertNode(val);
				Itr = find(val.first);
				isInsert = true;
			}
			return (ft::make_pair(Itr, isInsert));
		}

		iterator insert (iterator position, const value_type& val)
		{
			static_cast<void>(position);
			ft::pair<iterator,bool> Pair = insert(val);
			return (Pair.first);
		}
	
		template <class InputIterator>
		void insert (InputIterator first, InputIterator last, typename ft::enable_if<!is_integral<InputIterator>::value, InputIterator>::type * = nullptr_t)
		{
			while (first != last)
			{
				_Tree->InsertNode(ft::make_pair(first->first, first->second));
				first++;
			}
		}

		void erase (iterator position)
		{ _Tree->DeleteSpecificNode(position.GetNode(), position.GetPair()); }
		
		size_type erase (const key_type& k)
		{ return (!_Tree->DeleteNode(ft::make_pair(k, mapped_type()))); }
		
		void erase (iterator first, iterator last)
		{
			while (first != last)
				erase(first++);
		}

		void swap (map& x)
		{
			ft_swap(this->_Allocation, x._Allocation);
			ft_swap(this->_Compare, x._Compare);
			ft_swap(this->_Tree, x._Tree);
			ft_swap(this->_TreeAllocation, x._TreeAllocation);
		}

		void clear() { erase(begin(), end()); }
	#pragma endregion

	#pragma region Observers
		key_compare key_comp() const { return _Compare; }
		value_compare value_comp() const { return value_compare(_Compare); }
	#pragma endregion

	#pragma region Operations
		iterator find (const key_type& k)
		{ return iterator(_Tree->SearchTree(ft::make_pair(k, mapped_type())), _Tree); }
		const_iterator find (const key_type& k) const
		{ return const_iterator(_Tree->SearchTree(ft::make_pair(k, mapped_type())), _Tree); }

		size_type count (const key_type& k) const
		{
			if (_Tree->SearchTree(ft::make_pair(k, mapped_type())) == _Tree->GetTNULL()) return (false);
			return (true);
		}

		iterator lower_bound (const key_type& k)
		{
			iterator Itr = this->begin();
			while (Itr != end())
			{
				if (!_Compare(Itr->first, k))
					break ;
				Itr++;
			}
			return Itr;
		}
		const_iterator lower_bound (const key_type& k) const
		{
			const_iterator Itr = this->begin();
			while (Itr != end())
			{
				if (!_Compare(Itr->first, k))
					break ;
				Itr++;
			}
			return Itr;
		}

		iterator upper_bound (const key_type& k)
		{
			iterator Itr = begin();
			while (Itr != end())
			{
				if (_Compare(k, Itr->first))
					break ;
				Itr++;
			}
			return Itr;
		}
		const_iterator upper_bound (const key_type& k) const
		{
			const_iterator Itr = begin();
			while (Itr != end())
			{
				if (_Compare(k, Itr->first))
					break ;
				Itr++;
			}
			return Itr;
		}

		ft::pair<const_iterator, const_iterator> equal_range (const key_type& k) const
		{ return (ft::make_pair(lower_bound(k), upper_bound(k))); }
		ft::pair<iterator, iterator> equal_range (const key_type& k)
		{ return (ft::make_pair(lower_bound(k), upper_bound(k))); }
	#pragma endregion
};
	#pragma region Non-member function overloads
	template <class Key, class T, class Compare, class Alloc>
	bool operator== (const map<Key, T, Compare, Alloc>& lhs, const map<Key, T, Compare, Alloc>& rhs)
	{
		if (lhs.size() != rhs.size())
			return false;
		return (ft::equal(lhs.begin(), lhs.end(), rhs.begin()));
	}
	
	template <class Key, class T, class Compare, class Alloc>
	bool operator!= (const map<Key, T, Compare, Alloc>& lhs, const map<Key, T, Compare, Alloc>& rhs)
	{ return !(lhs == rhs); }
	
	template <class Key, class T, class Compare, class Alloc>
	bool operator< (const map<Key, T, Compare, Alloc>& lhs, const map<Key, T, Compare, Alloc>& rhs)
	{return ft::lexicographical_compare(lhs.begin(), lhs.end(), rhs.begin(), rhs.end()); }
	
	template <class Key, class T, class Compare, class Alloc>
	bool operator<= (const map<Key, T, Compare, Alloc>& lhs, const map<Key, T, Compare, Alloc>& rhs)
	{ return !(rhs < lhs); }
	
	template <class Key, class T, class Compare, class Alloc>
	bool operator> (const map<Key, T, Compare, Alloc>& lhs, const map<Key, T, Compare, Alloc>& rhs)
	{ return (rhs < lhs); }
	
	template <class Key, class T, class Compare, class Alloc>
	bool operator>= (const map<Key, T, Compare, Alloc>& lhs, const map<Key, T, Compare, Alloc>& rhs)
	{ return !(lhs < rhs); }

	template <class Key, class T, class Compare, class Alloc>
	void swap(map<Key, T, Compare, Alloc>& lhs, map<Key, T, Compare, Alloc>& rhs)
	{ lhs.swap(rhs); }
	#pragma endregion
} // namespace ft

#endif
